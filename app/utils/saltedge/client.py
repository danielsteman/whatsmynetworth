import logging
import os
import time
from typing import Any

import httpx

from app.schemas.account import Account
from app.schemas.connection import Connection, ConnectionLink
from app.schemas.customer import Customer, DeletedCustomer
from app.schemas.provider import Provider
from app.schemas.transaction import Transaction
from app.utils.saltedge import constants
from app.utils.saltedge.date_utils import get_timedelta_str
from app.utils.saltedge.exceptions import (
    ConnectionCreationError,
    CustomerAlreadyExists,
    CustomerCreationError,
    ListAccountsError,
    ListTransactionsError,
)

logger = logging.getLogger(__name__)


class SaltEdgeConfig:
    def __init__(self) -> None:
        self.app_id = os.environ.get("APP_ID")
        self.secret = os.environ.get("SECRET")
        if self.app_id is None:
            raise ValueError("Saltedge APP_ID is not set")
        if self.secret is None:
            raise ValueError("Saltedge SECRET is not set")


class SaltEdgeClient(httpx.Client):
    def __init__(self, config: SaltEdgeConfig = SaltEdgeConfig()) -> None:
        super().__init__(
            headers={
                "Accept": "application/json",
                "Content-type": "application/json",
                "App-id": config.app_id,
                "Secret": config.secret,
            }
        )
        self.providers: list[Provider] = []
        self.transactions: list[Transaction] = []

    def request(
        self, url: str, method: str = "GET", *args: list[Any], **kwargs: dict[str, Any]
    ) -> httpx.Response:
        try:
            response = super().request(method, url, *args, **kwargs)
            if response.status_code == 429:
                logger.warning("Rate limit exceeded, retrying after delay")
                retry_after = int(response.headers.get("Retry-After", 1))
                time.sleep(retry_after)
                return self.request(url, method, *args, **kwargs)
            response.raise_for_status()
            return response
        except httpx.HTTPStatusError as e:
            logger.error(
                f"HTTP error occurred: {e.response.status_code} - {e.response.text}"
            )
            raise
        except httpx.RequestError as e:
            logger.error(f"Request error occurred: {e}")
            raise

    def list_providers(
        self, country_code: str = "NL", next_url: str | None = None
    ) -> list[Provider]:
        if next_url:
            url = next_url
        else:
            url = constants.PROVIDERS_URL

        response = self.request(url, params={"country_code": country_code})

        data = response.json()
        providers = data.get("data", [])
        if not providers:
            logger.error("no provider data found in response")
            return self.providers

        providers_objects = [Provider(**data) for data in providers]
        self.providers.extend(providers_objects)

        if next_page := data.get("meta").get("next_page"):
            logger.info("found next page of providers")
            self.list_providers(
                country_code=country_code,
                next_url=f"https://www.saltedge.com{next_page}",
            )

        return self.providers

    def create_customer(self, id_: str) -> Customer:
        """
        Before we can create any connections using Account Information API,
        we need to create a Customer.
        A Customer in Account Information API is the end-user of your application.
        """
        body = {"data": {"identifier": id_}}
        try:
            response = self.request(constants.CUSTOMERS_URL, "POST", json=body)
            data = response.json()
            customer = data.get("data")

            if not customer:
                logger.error(
                    "Something went wrong creating a customer: No customer data in response"
                )
                raise CustomerCreationError(
                    "No customer data in response from SaltEdge API"
                )
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 409:
                raise CustomerAlreadyExists()
            else:
                raise

        customer_object = Customer(**customer)
        return customer_object

    def get_customer(self, id_: str) -> Customer | None:
        url = f"{constants.CUSTOMERS_URL}/{id_}"
        try:
            response = self.request(url, "GET")
            data = response.json()
            customer = data.get("data")
            if not customer:
                logger.error(
                    "Something went wrong getting a customer: No customer data in response"
                )
                return None
            customer_object = Customer(**customer)
            return customer_object
        except httpx.HTTPStatusError as e:
            logger.error(
                f"HTTP status error occurred while getting a customer: {e.response.status_code} - {e.response.text}"
            )
            return None
        except httpx.RequestError as e:
            logger.error(f"Request error occurred while getting a customer: {e}")
            return None

    def delete_customer(self, id_: str) -> DeletedCustomer | None:
        url = f"{constants.CUSTOMERS_URL}/{id_}"
        try:
            response = self.request(url, "DELETE")
            data = response.json()
            customer = data.get("data")
            if not customer:
                logger.error(
                    "Something went wrong deleting a customer: No customer data in response"
                )
                return None
            customer_object = DeletedCustomer(**customer)
            return customer_object
        except httpx.HTTPStatusError as e:
            logger.error(
                f"HTTP status error occurred while deleting a customer: {e.response.status_code} - {e.response.text}"
            )
            return None
        except httpx.RequestError as e:
            logger.error(f"Request error occurred while deleting a customer: {e}")
            return None

    def create_connect_session(self, customer_id: str) -> Connection:
        url = f"{constants.CONNECT_SESSIONS_URL}/create"
        data = {
            "data": {
                "customer_id": customer_id,
                "consent": {
                    "from_date": get_timedelta_str(-180),
                    "scopes": [
                        "account_details",
                        "transactions_details",
                    ],
                },
                "attempt": {
                    "fetch_scopes": [
                        "accounts",
                        "transactions",
                    ],
                },
            }
        }
        response = self.request(url, "POST", json=data)
        data = response.json()
        connection_data = data.get("data")
        if not connection_data:
            logger.error(
                "Something went wrong creating a customer: No customer data in response"
            )
            raise ConnectionCreationError(
                "No connection data in response from SaltEdge API"
            )
        return ConnectionLink(**connection_data)

    def list_connections(self, customer_id: str) -> list[Connection]:
        response = self.request(
            constants.CONNECTIONS_URL, params={"customer_id": customer_id}
        )
        data = response.json()
        connections_data = data.get("data")
        if not connections_data:
            logger.info("Could not find connections for Saltedge customer")
            return []
        logger.info(f"Found {len(connections_data)} connections for {customer_id}")
        return [Connection(**connection_dict) for connection_dict in connections_data]

    def list_accounts(self, connection_id: str) -> list[Account] | None:
        response = self.request(
            constants.ACCOUNTS_URL, params={"connection_id": connection_id}
        )
        data = response.json()
        accounts_data = data.get("data")
        if accounts_data is None:
            logger.error(
                "Something went wrong getting accounts: No accounts data in response"
            )
            raise ListAccountsError(
                "No connection data found in response from SaltEdge API"
            )
        if not accounts_data:
            logger.warning(f"Connection {connection_id}: has no accounts")
            return None
        return [Account(**account_dict) for account_dict in accounts_data]

    def get_transactions(
        self, account_id: str, connection_id: str, next_url: str | None = None
    ) -> list[Transaction] | None:
        params = {"connection_id": connection_id, "account_id": account_id}

        if next_url:
            url = next_url
        else:
            url = constants.TRANSACTIONS_URL

        response = self.request(
            url,
            params=params,
        )

        data = response.json()
        transactions_data = data.get("data")

        if transactions_data is None:
            logger.error(
                "Something went wrong getting transactions: No transactions data found in response"
            )
            raise ListTransactionsError()

        if not transactions_data:
            logger.warning(f"Transaction page on {response.url} has no transactions")
            return None

        self.transactions.extend(
            [Transaction(**transaction_dict) for transaction_dict in transactions_data]
        )

        if next_page := data.get("meta").get("next_page"):
            logger.info("found next page of providers")
            self.get_transactions(
                account_id=account_id,
                connection_id=connection_id,
                next_url=f"https://www.saltedge.com{next_page}",
            )

        return self.transactions

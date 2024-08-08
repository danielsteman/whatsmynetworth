import logging
import os
import time
from typing import Any, Optional

import httpx

from app.utils.saltedge.date_utils import get_timedelta_str
from app.utils.saltedge.models import Customer, Provider

logger = logging.getLogger(__name__)

PROVIDERS_URL = "https://www.saltedge.com/api/v5/providers"
CUSTOMERS_URL = "https://www.saltedge.com/api/v5/customers"
CONNECTIONS_URL = "https://www.saltedge.com/api/v5/connect_sessions"


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
        self.providers: list[dict] = []

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
            url = PROVIDERS_URL

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

    def create_customer(self, id_: int) -> Optional[Customer]:
        """
        Before we can create any connections using Account Information API,
        we need to create a Customer.
        A Customer in Account Information API is the end-user of your application.
        """
        body = {"data": {"identifier": id_}}
        try:
            response = self.request(CUSTOMERS_URL, "POST", json=body)
            data = response.json()
            customer = data.get("data")
            if not customer:
                logger.error(
                    "Something went wrong creating a customer: No customer data in response"
                )
                return None
            customer_object = Customer(**customer)
            return customer_object
        except httpx.HTTPStatusError as e:
            logger.error(
                f"HTTP error occurred: {e.response.status_code} - {e.response.text}"
            )
            return None
        except httpx.RequestError as e:
            logger.error(f"Request error occurred: {e}")
            return None

    def get_customer(self, id_: str) -> Optional[dict]:
        """
        returns:
        {
            "data": {
                "id": "222222222222222222",
                "identifier": "12rv1212f1efxchsdhbgv",
                "secret": "secret",
                "blocked_at": "2021-03-15T09:43:01Z",
                "created_at": "2020-03-12T09:20:01Z",
                "updated_at": "2020-03-12T09:20:01Z"
            }
        }
        """
        url = f"{CUSTOMERS_URL}/{id_}"
        try:
            response = self.request(url, "GET")
            data = response.json()
            customer = data.get("data")
            if not customer:
                logger.error(
                    "Something went wrong getting a customer: No customer data in response"
                )
                return None
            return customer
        except httpx.HTTPStatusError as e:
            logger.error(
                f"HTTP status error occurred while getting a customer: {e.response.status_code} - {e.response.text}"
            )
            return None
        except httpx.RequestError as e:
            logger.error(f"Request error occurred while getting a customer: {e}")
            return None

    def delete_customer(self, id_: str) -> Optional[dict]:
        """
        returns:
        {
            "data": {
                "deleted": true,
                "id": "123"
            }
        }
        """
        url = f"{CUSTOMERS_URL}/{id_}"
        try:
            response = self.request(url, "DELETE")
            data = response.json()
            customer = data.get("data")
            if not customer:
                logger.error(
                    "Something went wrong deleting a customer: No customer data in response"
                )
                return None
            return customer
        except httpx.HTTPStatusError as e:
            logger.error(
                f"HTTP status error occurred while deleting a customer: {e.response.status_code} - {e.response.text}"
            )
            return None
        except httpx.RequestError as e:
            logger.error(f"Request error occurred while deleting a customer: {e}")
            return None

    def create_connect_session(self, customer_id: str) -> Optional[dict]:
        """
        Docs: https://docs.saltedge.com/account_information/v5/#connect_sessions-create
        """
        url = f"{CONNECTIONS_URL}/create"
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
        connection = data.get("data")
        if not connection:
            logger.error(
                "Something went wrong deleting a customer: No customer data in response"
            )
            return None
        return data

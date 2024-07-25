import logging
import os
from typing import Optional
import httpx
import time

from app.utils.saltedge.models import Provider

logger = logging.getLogger(__name__)

PROVIDERS_URL = "https://www.saltedge.com/api/v5/providers"
CUSTOMERS_URL = "https://www.saltedge.com/api/v5/customers"


class SaltEdgeConfig:
    def __init__(self):
        self.app_id = os.environ.get("APP_ID")
        self.secret = os.environ.get("SECRET")
        if self.app_id is None:
            raise ValueError("Saltedge APP_ID is not set")
        if self.secret is None:
            raise ValueError("Saltedge SECRET is not set")


class SaltEdgeClient(httpx.Client):
    def __init__(self, config: SaltEdgeConfig = SaltEdgeConfig()):
        super().__init__(
            headers={
                "Accept": "application/json",
                "Content-type": "application/json",
                "App-id": config.app_id,
                "Secret": config.secret,
            }
        )
        self.providers: list[Provider] = []

    def request(self, url: str, method: str = "GET", *args, **kwargs):
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
    ) -> list[dict]:
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

        self.providers.extend(providers)

        if next_page := data.get("meta").get("next_page"):
            logger.info("found next page of providers")
            self.list_providers(
                country_code=country_code,
                next_url=f"https://www.saltedge.com{next_page}",
            )

        return self.providers

    def create_customer(self, id_: int) -> Optional[dict]:
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
            return customer
        except httpx.HTTPStatusError as e:
            logger.error(
                f"HTTP error occurred: {e.response.status_code} - {e.response.text}"
            )
            return
        except httpx.RequestError as e:
            logger.error(f"Request error occurred: {e}")
            return

    def get_customer(self, id_: str) -> Optional[dict]:
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
            return
        except httpx.RequestError as e:
            logger.error(f"Request error occurred while getting a customer: {e}")
            return

    def delete_customer(self, id_: str) -> dict:
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
            return
        except httpx.RequestError as e:
            logger.error(f"Request error occurred while deleting a customer: {e}")
            return

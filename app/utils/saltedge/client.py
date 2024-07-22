import logging
import os
import httpx

from app.utils.saltedge.models import Provider

logger = logging.getLogger(__name__)

PROVIDERS_URL = "https://www.saltedge.com/api/v5/providers"


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

    def list_providers(self, country_code: str = "NL", next_url: str | None = None):
        if next_url:
            url = next_url
        else:
            url = PROVIDERS_URL

        response = self.get(url, params={"country_code": country_code})
        response.raise_for_status()

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

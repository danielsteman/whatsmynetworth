import os
import httpx


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

    def list_providers(self):
        response = self.get(PROVIDERS_URL)
        response.raise_for_status()
        return response.json()

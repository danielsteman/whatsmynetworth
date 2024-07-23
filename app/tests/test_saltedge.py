from pydantic import ValidationError
import pytest
from app.utils.saltedge.client import SaltEdgeClient
from app.utils.saltedge.models import Provider


@pytest.fixture
def client():
    return SaltEdgeClient()


def test_list_providers_at_least_one(client):
    providers = client.list_providers(country_code=None)
    assert len(providers) > 0, "expected at least one provider"


def test_validate_all_providers_in_list(client):
    providers = client.list_providers(country_code=None)
    for p in providers:
        try:
            Provider(**p)
        except ValidationError as e:
            raise AssertionError(
                f"JSON didn't fit in model: {p}\nValidation error: {e}"
            )

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


def test_create_get_delete_customer(client):
    mock_id = "123"
    customer = client.create_customer(mock_id)
    assert customer, "expected customer to be created"
    customer_id = customer.get("id")
    assert customer_id, "expected customer id in response body of created customer"
    customer_info = client.get_customer(customer_id)
    assert customer_info, "expected customer info"
    deleted_customer = client.delete_customer(customer_id)
    assert deleted_customer, "expected deleted customer info"


def test_create_connection(client):
    # mock_id = "123"
    # customer = client.create_customer(mock_id)
    customer_id = "1333431323741657632"
    connect_session = client.create_connect_session(customer_id)
    assert connect_session

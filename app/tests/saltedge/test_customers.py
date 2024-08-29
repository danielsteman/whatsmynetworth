import pytest

from app.repositories import customer_repository
from app.utils.saltedge.exceptions import CustomerAlreadyExists


def test_create_get_delete_customer(client):
    mock_id = "123"
    customer = client.create_customer(mock_id)
    assert customer, "expected customer to be created"
    customer_id = customer.id
    assert customer_id, "expected customer id in response body of created customer"
    customer_info = client.get_customer(customer_id)
    assert customer_info, "expected customer info"
    deleted_customer = client.delete_customer(customer_id)
    assert deleted_customer, "expected deleted customer info"


def test_customer_already_exists(client):
    mock_id = "321"
    customer = client.create_customer(mock_id)
    with pytest.raises(CustomerAlreadyExists):
        client.create_customer(mock_id)
    client.delete_customer(customer.id)


def test_get_customer_id_by_identifier(
    db, consented_customer_identifier, test_customer
):
    customer = customer_repository.get_customer_by_identifier(
        db, consented_customer_identifier
    )
    assert customer.id == test_customer.id

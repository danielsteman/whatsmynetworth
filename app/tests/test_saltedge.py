from app.models.provider import Provider


def test_list_providers_at_least_one(client):
    providers = client.list_providers(country_code=None)
    assert len(providers) > 0, "expected at least one provider"


def test_validate_all_providers_in_list(client):
    providers = client.list_providers(country_code=None)
    for p in providers:
        assert isinstance(p, Provider)


def test_create_connection(client):
    mock_id = "123"
    try:
        customer = client.create_customer(mock_id)
        customer_id = customer.id
        connect_session = client.create_connect_session(customer_id)
        assert connect_session
    finally:
        client.delete_customer(customer_id)

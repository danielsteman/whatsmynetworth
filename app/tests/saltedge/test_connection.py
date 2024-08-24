from app.schemas import Connection


def test_create_connection(client):
    mock_id = "123"
    try:
        customer = client.create_customer(mock_id)
        customer_id = customer.id
        connect_session = client.create_connect_session(customer_id)
        assert connect_session
        assert isinstance(connect_session, Connection)
    finally:
        client.delete_customer(customer_id)


def test_get_connection(client):
    mock_id = "123"
    try:
        customer = client.create_customer(mock_id)
        customer_id = customer.id
        client.create_connect_session(customer_id)
        connection = client.get_connection(customer_id)
        assert connection
    finally:
        client.delete_customer(customer_id)

from app.schemas import ConnectionLink


def test_create_connection_link(client):
    mock_id = "123"
    try:
        customer = client.create_customer(mock_id)
        customer_id = customer.id
        connect_session = client.create_connect_session(customer_id)
        assert connect_session
        assert isinstance(connect_session, ConnectionLink)
    finally:
        client.delete_customer(customer_id)


# def test_get_connection(client):
#     mock_id = "123"
#     try:
#         customer = client.create_customer(mock_id)
#         customer_id = customer.id
#         connect_session = client.create_connect_session(customer_id)
#         # give consent through connect_session
#         connection = client.get_connection(customer_id)
#         assert connection
#     finally:
#         client.delete_customer(customer_id)

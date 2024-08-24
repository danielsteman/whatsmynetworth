# from app.schemas import Connection
# from app.schemas import Account


def test_list_accounts(client):
    mock_id = "123"
    try:
        customer = client.create_customer(mock_id)
        customer_id = customer.id
        # connect_session = client.create_connect_session(customer_id)
        # accounts = client.list_accounts()
    finally:
        client.delete_customer(customer_id)

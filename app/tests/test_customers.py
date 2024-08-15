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

def test_list_accounts(client, consented_customer_id):
    connections = client.get_connections(consented_customer_id)
    connection_ids = [con.id for con in connections if con.status == "active"]
    for id_ in connection_ids:
        assert client.list_accounts(id_)

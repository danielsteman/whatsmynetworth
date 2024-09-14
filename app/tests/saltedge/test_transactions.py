def test_get_transactions(
    client,
    consented_connection_id,
    consented_account_id,
):
    transactions = client.get_transactions(
        consented_connection_id,
        consented_account_id,
    )
    assert len(transactions) > 100

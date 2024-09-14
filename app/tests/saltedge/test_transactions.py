def test_get_transactions(
    client,
    consented_connection_id,
    consented_account_id,
):
    transactions = client.get_transactions(
        connection_id=consented_connection_id,
        account_id=consented_account_id,
    )
    assert len(transactions) > 100
    for transaction in transactions:
        assert transaction.account_id == consented_account_id

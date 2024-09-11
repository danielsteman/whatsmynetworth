def test_get_transactions(
    client,
    consented_connection_id,
    consented_account_id,
):
    transactions = client.get_transactions(
        consented_account_id,
        consented_connection_id,
    )
    assert len(transactions) > 100


def test_get_transactions_by_customer_identifier() -> None:
    pass

def test_list_transactions(
    client,
    consented_connection_id,
    consented_account_id,
):
    transactions = client.list_transactions(
        consented_account_id,
        consented_connection_id,
    )
    assert transactions


def test_get_transactions_by_customer_identifier() -> None:
    pass

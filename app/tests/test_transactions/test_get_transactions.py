def test_list_transactions(
    client, consented_customer_id, consented_customer_account_id
):
    transactions = client.list_transactions(
        consented_customer_account_id, consented_customer_id
    )
    assert transactions


def test_get_transactions_by_customer_identifier() -> None:
    pass

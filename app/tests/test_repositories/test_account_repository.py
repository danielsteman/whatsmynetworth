from app.repositories import account_repository


def test_get_all_accounts_from_db(db, consented_connection_id):
    accounts = account_repository.get_all_accounts_from_db(db, consented_connection_id)
    assert accounts

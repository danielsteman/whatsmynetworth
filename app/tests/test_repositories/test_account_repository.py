from datetime import datetime

import pytest

from app.repositories import account_repository
from app.schemas.account import Account


@pytest.fixture
def dummy_account():
    return Account(
        id="123456",
        name="Sample Account",
        nature="Checking",
        balance=1500.75,
        currency_code="USD",
        connection_id="654321",
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )


def test_get_all_accounts_from_db(db, dummy_account):
    account_repository.create_or_update_account_in_db(db, dummy_account)
    accounts = account_repository.get_all_accounts_from_db(db, "654321")
    assert accounts

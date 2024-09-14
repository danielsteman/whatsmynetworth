from datetime import datetime

import pytest

from app import schemas
from app.repositories import transaction_repository


@pytest.fixture
def dummy_transactions():
    return [
        schemas.Transaction(
            id="txn_001",
            duplicated=False,
            mode="online",
            status="completed",
            made_on=str(datetime.now()),
            amount=100.50,
            currency_code="USD",
            description="Purchase at Store A",
            category="shopping",
            extra=schemas.TransactionMetadata(
                merchant_id="store_a_123",
                original_amount=100.50,
                original_currency_code="USD",
                posting_date=str(datetime.now().date()),
                time="12:34:56",
                id="extra_001",
                type="purchase",
                payee="Store A",
                payer="User1",
                additional="First purchase",
                payer_information="Card ending in 1234",
                account_balance_snapshot=900.00,
                categorization_confidence=0.95,
            ),
            account_id="acc_001",
            created_at=str(datetime.now()),
            updated_at=str(datetime.now()),
        ),
        schemas.Transaction(
            id="txn_002",
            duplicated=False,
            mode="offline",
            status="pending",
            made_on=str(datetime.now()),
            amount=50.75,
            currency_code="EUR",
            description="Dinner at Restaurant B",
            category="dining",
            extra=schemas.TransactionMetadata(
                merchant_id="restaurant_b_456",
                original_amount=50.75,
                original_currency_code="EUR",
                posting_date=str(datetime.now().date()),
                time="18:45:00",
                id="extra_002",
                type="dining",
                payee="Restaurant B",
                payer="User1",
                additional="Dinner with family",
                payer_information="Card ending in 5678",
                account_balance_snapshot=850.00,
                categorization_confidence=0.90,
            ),
            account_id="acc_002",
            created_at=str(datetime.now()),
            updated_at=str(datetime.now()),
        ),
        schemas.Transaction(
            id="txn_003",
            duplicated=True,
            mode="online",
            status="failed",
            made_on=str(datetime.now()),
            amount=200.00,
            currency_code="GBP",
            description="Online Subscription",
            category="subscriptions",
            extra=schemas.TransactionMetadata(
                merchant_id="online_service_789",
                original_amount=200.00,
                original_currency_code="GBP",
                posting_date=str(datetime.now().date()),
                time="09:15:30",
                id="extra_003",
                type="subscription",
                payee="Online Service",
                payer="User2",
                additional="Monthly subscription",
                payer_information="Card ending in 9876",
                account_balance_snapshot=650.00,
                categorization_confidence=0.85,
            ),
            account_id="acc_003",
            created_at=str(datetime.now()),
            updated_at=str(datetime.now()),
        ),
    ]


def test_create_and_get_db_transactions(db, dummy_transactions) -> None:
    transaction_repository.create_transactions(db, dummy_transactions)
    account_id = dummy_transactions[0].account_id
    db_transactions = transaction_repository.get_transactions_from_db(db, account_id)
    assert db_transactions[0].account_id == account_id

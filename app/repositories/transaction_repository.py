import logging

from sqlalchemy.orm import Session

from app import models, schemas
from app.repositories import account_repository
from app.utils.saltedge.client import SaltEdgeClient

logger = logging.getLogger("uvicorn.error")


def convert_pydantic_to_sqlalchemy(
    transaction: schemas.Transaction,
) -> models.Transaction:
    extra = None
    if transaction.extra:
        extra = models.TransactionMetadata(
            id=transaction.extra.id,
            merchant_id=transaction.extra.merchant_id,
            original_amount=transaction.extra.original_amount,
            original_currency_code=transaction.extra.original_currency_code,
            posting_date=transaction.extra.posting_date,
            time=transaction.extra.time,
            type=transaction.extra.type,
            payee=transaction.extra.payee,
            payer=transaction.extra.payer,
            additional=transaction.extra.additional,
            payer_information=transaction.extra.payer_information,
            account_balance_snapshot=transaction.extra.account_balance_snapshot,
            categorization_confidence=transaction.extra.categorization_confidence,
        )

    sqlalchemy_transaction = models.Transaction(
        id=transaction.id,
        duplicated=transaction.duplicated,
        mode=transaction.mode,
        status=transaction.status,
        made_on=transaction.made_on,
        amount=transaction.amount,
        currency_code=transaction.currency_code,
        description=transaction.description,
        category=transaction.category,
        extra=extra,
        account_id=transaction.account_id,
        created_at=transaction.created_at,
        updated_at=transaction.updated_at,
    )

    return sqlalchemy_transaction


def convert_sqlalchemy_to_pydantic(
    transaction: models.Transaction,
) -> schemas.Transaction:
    extra = None
    if transaction.extra:
        extra = schemas.TransactionMetadata(
            id=transaction.extra.id,
            merchant_id=transaction.extra.merchant_id,
            original_amount=transaction.extra.original_amount,
            original_currency_code=transaction.extra.original_currency_code,
            posting_date=transaction.extra.posting_date,
            time=transaction.extra.time,
            type=transaction.extra.type,
            payee=transaction.extra.payee,
            payer=transaction.extra.payer,
            additional=transaction.extra.additional,
            payer_information=transaction.extra.payer_information,
            account_balance_snapshot=transaction.extra.account_balance_snapshot,
            categorization_confidence=transaction.extra.categorization_confidence,
        )

    pydantic_transaction = schemas.Transaction(
        id=transaction.id,
        duplicated=transaction.duplicated,
        mode=transaction.mode,
        status=transaction.status,
        made_on=transaction.made_on,
        amount=transaction.amount,
        currency_code=transaction.currency_code,
        description=transaction.description,
        category=transaction.category,
        extra=extra,
        account_id=transaction.account_id,
        created_at=transaction.created_at,
        updated_at=transaction.updated_at,
    )

    return pydantic_transaction


def get_transactions_from_db(db: Session, account_id: str) -> list[models.Transaction]:
    return db.query(models.Transaction).filter_by(account_id=account_id).all()


def get_all_transaction_from_db_by_identifier(
    db: Session, identifier: str
) -> list[models.Transaction]:
    accounts = account_repository.get_accounts_by_identifier(db, identifier)
    all_transactions = []
    for account in accounts:
        transactions = get_transactions_from_db(db, account.id)
        all_transactions.extend(transactions)
    return all_transactions


def create_transactions(db: Session, transactions: list[schemas.Transaction]) -> None:
    for transaction in transactions:
        db_transaction = convert_pydantic_to_sqlalchemy(transaction)
        db.add(db_transaction)
        db.commit()
        db.refresh(db_transaction)


def create_or_update_transactions(
    db: Session, transactions: list[schemas.Transaction]
) -> None:
    for transaction in transactions:
        db_transaction = convert_pydantic_to_sqlalchemy(transaction)
        db.merge(db_transaction)

    db.commit()


def sync_transactions(db: Session, client: SaltEdgeClient, connection_id: str) -> None:
    accounts = account_repository.get_all_accounts_from_db(
        db, connection_id=connection_id
    )
    stats = {}
    for account in accounts:
        transactions = client.get_transactions(
            account_id=account.id, connection_id=connection_id
        )

        if transactions is None:
            logger.warning(
                f"Could not find transactions for account {account.id} using connection {connection_id}"
            )

            stats[account] = 0
            continue

        create_or_update_transactions(db, transactions)
        stats[account] = len(transactions)

        logger.info(f"Ingested all transactions for account {account.id}")

    logger.info(
        f"Finished ingesting all transactions for connection {connection_id}. Result: {stats}"
    )

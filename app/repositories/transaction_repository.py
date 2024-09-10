from sqlalchemy.orm import Session

from app import models, schemas

# from app.repositories import connection_repository
from app.utils.saltedge.client import SaltEdgeClient


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


async def create_transactions(
    db: Session, transactions: list[schemas.Transaction]
) -> None:
    try:
        for transaction in transactions:
            sqlalchemy_transaction = convert_pydantic_to_sqlalchemy(transaction)
            db.add(sqlalchemy_transaction)
        await db.commit()
    except Exception as e:
        await db.rollback()
        raise e
    finally:
        await db.close()


async def get_transactions(
    db: Session, client: SaltEdgeClient, identifier: str
) -> None:
    # connection = connection_repository.get_active_connection(db, client, identifier)
    pass

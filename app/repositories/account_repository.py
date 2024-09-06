import logging

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app import models, schemas
from app.utils.saltedge.client import SaltEdgeClient

logger = logging.getLogger("uvicorn.error")


def get_account_by_identifier(db: Session, identifier: str) -> models.Account | None:
    return db.query(models.Account).filter_by(identifier=identifier).first()


def get_account_by_id(db: Session, _id: str) -> models.Account | None:
    return db.query(models.Account).filter_by(id=_id).first()


def create_or_update_account_in_db(
    db: Session, account: schemas.Account
) -> models.Account:
    existing_account = get_account_by_id(db, account.id)
    if existing_account:
        existing_account.name = account.name
        existing_account.nature = account.nature
        existing_account.balance = account.balance
        existing_account.currency_code = account.currency_code
        existing_account.connection_id = account.connection_id
        existing_account.updated_at = account.updated_at

        db.commit()
        db.refresh(existing_account)
        logger.info(f"Updated account with id {account.id}")
        return existing_account

    db_account = models.Account(
        id=account.id,
        name=account.name,
        nature=account.nature,
        balance=account.balance,
        currency_code=account.currency_code,
        connection_id=account.connection_id,
        created_at=account.created_at,
        updated_at=account.updated_at,
    )
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    logger.info(f"Created new account with id {account.id}")
    return db_account


def ingest_all_accounts(
    db: Session,
    client: SaltEdgeClient,
    connection_id: str,
) -> None:
    accounts = client.list_accounts(connection_id)
    for account in accounts:
        create_or_update_account_in_db(db, account)
        logger.info(f"Connection {connection_id}: ingested account {account.id}")
    logger.info(f"Connection {connection_id}: finished ingesting all accounts")


def get_all_accounts_from_db(db: Session, connection_id: str) -> list[schemas.Account]:
    try:
        accounts = db.query(models.Account).filter_by(connection_id=connection_id).all()
        return accounts
    except SQLAlchemyError as e:
        logger.error(f"Failed to get accounts from database: {e}")
        return []
    except Exception as e:
        logger.error(f"An unexpected error occurred: {e}")
        return []

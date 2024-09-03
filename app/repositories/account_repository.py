import logging

from sqlalchemy.orm import Session

from app import models, schemas
from app.utils.saltedge.client import SaltEdgeClient

logger = logging.getLogger("uvicorn.error")


def get_account_by_identifier(db: Session, identifier: str) -> models.Account | None:
    return db.query(models.Account).filter_by(identifier=identifier).first()


def create_account_in_db(db: Session, account: schemas.Account) -> models.Account:
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
    return db_account


def ingest_all_accounts(
    connection_id: str, db: Session, client: SaltEdgeClient
) -> None:
    accounts = client.list_accounts(connection_id)
    for account in accounts:
        create_account_in_db(db, account)
        logger.info(f"Connection {connection_id}: ingested account {account.id}")
    logger.info(f"Connection {connection_id}: finished ingesting all accounts")

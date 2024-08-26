from sqlalchemy.orm import Session

from app import models, schemas


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

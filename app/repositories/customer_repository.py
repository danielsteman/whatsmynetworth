from sqlalchemy.orm import Session

from app import models


def get_customer_by_identifier(db: Session, identifier: str) -> models.Customer | None:
    return db.query(models.Customer).filter_by(identifier=identifier).first()


def create_customer_in_db(
    db: Session, id: str, identifier: str, secret: str, created_at: str, updated_at: str
) -> models.Customer:
    db_customer = models.Customer(
        id=id,
        identifier=identifier,
        secret=secret,
        created_at=created_at,
        updated_at=updated_at,
    )
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer

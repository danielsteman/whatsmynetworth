import logging

from sqlalchemy.exc import NoResultFound
from sqlalchemy.orm import Session

from app import models, schemas

logger = logging.getLogger("uvicorn.error")


def get_customer_by_identifier(db: Session, identifier: str) -> models.Customer | None:
    return db.query(models.Customer).filter_by(identifier=identifier).first()


def create_customer_in_db(
    db: Session, customer: schemas.Customer
) -> models.Customer | None:
    db_customer = get_customer_by_identifier(db, customer.id)
    if db_customer:
        logger.info(f"Customer with id {db_customer.id} already exists in database")
        return None
    new_db_customer = models.Customer(
        id=customer.id,
        identifier=customer.identifier,
        secret=customer.secret,
        created_at=customer.created_at,
        updated_at=customer.updated_at,
    )
    db.add(new_db_customer)
    db.commit()
    db.refresh(new_db_customer)
    return new_db_customer


def delete_customer_in_db(db: Session, identifier: str) -> bool:
    try:
        db_customer = db.query(models.Customer).filter_by(identifier=identifier).one()
        db.delete(db_customer)
        db.commit()
        return True
    except NoResultFound:
        return False

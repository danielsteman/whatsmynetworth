from sqlalchemy.orm import Session

from app import models, schemas


def get_customer_by_identifier(db: Session, identifier: str) -> models.Customer | None:
    return db.query(models.Customer).filter_by(identifier=identifier).first()


def create_customer_in_db(db: Session, customer: schemas.Customer) -> models.Customer:
    db_customer = models.Customer(
        id=customer.id,
        identifier=customer.identifier,
        secret=customer.secret,
        created_at=customer.created_at,
        updated_at=customer.updated_at,
    )
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer

import logging

from sqlalchemy.orm import Session

from app import models, schemas
from app.utils.saltedge.client import SaltEdgeClient

logger = logging.getLogger("uvicorn.error")


def get_connection(db: Session, _id: str) -> models.Connection | None:
    return db.query(models.Connection).filter_by(_id=_id).first()


def create_connection(db: Session, connection: schemas.Connection) -> models.Connection:
    db_connection = get_connection(db, connection.id)
    if db_connection:
        logger.info(f"Connection with id {connection.id} already exists in database")
        return db_connection
    new_db_connection = models.Connection(
        id=connection.id,
        country_code=connection.country_code,
        created_at=connection.created_at,
        customer_id=connection.customer_id,
        daily_refresh=connection.daily_refresh,
        secret=connection.secret,
        categorization=connection.categorization,
        show_consent_confirmation=connection.show_consent_confirmation,
        last_consent_id=connection.last_consent_id,
        holder_info=connection.holder_info,
        last_success_at=connection.last_success_at,
        next_refresh_possible_at=connection.next_refresh_possible_at,
        provider_id=connection.provider_id,
        provider_code=connection.provider_code,
        provider_name=connection.provider_name,
        status=connection.status,
        store_credentials=connection.store_credentials,
        updated_at=connection.updated_at,
    )
    db.add(new_db_connection)
    db.commit()
    db.refresh(new_db_connection)
    return new_db_connection


def get_active_connection(
    db: Session, client: SaltEdgeClient, identifier: str
) -> schemas.Connection | None:
    """
    TODO: connections should be stored in database and fetched from there
    But then we first need to handle them callbacks after consent
    """
    db_customer = db.query(models.Customer).filter_by(identifier=identifier).one()
    customer_id = db_customer.id
    connections = client.get_connections(customer_id)
    active_connections = [conn for conn in connections if conn.status == "active"]
    if not active_connections:
        return None
    most_recent_connection = max(active_connections, key=lambda conn: conn.updated_at)
    return most_recent_connection

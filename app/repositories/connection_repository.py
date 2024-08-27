from sqlalchemy.orm import Session

from app import models, schemas
from app.utils.saltedge.client import SaltEdgeClient

# def create_connection(connection: schemas.Connection):
#     pass


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

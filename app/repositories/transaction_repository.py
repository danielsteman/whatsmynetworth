from sqlalchemy.orm import Session

# from app.repositories import connection_repository
from app.utils.saltedge.client import SaltEdgeClient


def get_transactions_by_customer_identifier(
    db: Session, client: SaltEdgeClient, identifier: str
) -> None:
    # connection = connection_repository.get_active_connection(db, client, identifier)
    pass

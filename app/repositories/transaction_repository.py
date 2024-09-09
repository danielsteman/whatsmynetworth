from sqlalchemy.orm import Session

# from app import models, schemas
# from app.repositories import connection_repository
from app.utils.saltedge.client import SaltEdgeClient

# async def create_transactions(db: Session, transactions: schemas.Transaction) -> models:


async def get_transactions(
    db: Session, client: SaltEdgeClient, identifier: str
) -> None:
    # connection = connection_repository.get_active_connection(db, client, identifier)
    pass

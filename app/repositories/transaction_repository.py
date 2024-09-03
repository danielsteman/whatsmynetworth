from sqlalchemy.orm import Session

from app.utils.saltedge.client import SaltEdgeClient


async def get_transactions(
    db: Session, client: SaltEdgeClient, identifier: str
) -> None:
    # connection = connection_repository.get_active_connection(db, client, identifier)
    pass

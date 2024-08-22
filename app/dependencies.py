from typing import Generator

from sqlalchemy.orm.session import Session

from app.utils.database import SessionLocal
from app.utils.saltedge.client import SaltEdgeClient


def get_salt_edge_client() -> SaltEdgeClient:
    return SaltEdgeClient()


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

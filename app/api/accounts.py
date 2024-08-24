import logging
from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm.session import Session

from app import schemas
from app.db.session import get_db
from app.dependencies import get_salt_edge_client
from app.utils.saltedge.client import SaltEdgeClient

router = APIRouter()
logger = logging.getLogger("uvicorn.error")


@router.post("/", response_model=list[schemas.Account], tags=["accounts"])
async def list_accounts(
    connection_id: str,
    client: Annotated[SaltEdgeClient, Depends(get_salt_edge_client)],
    db: Annotated[Session, Depends(get_db)],
) -> list[schemas.Account]:
    accounts = client.list_accounts(connection_id=connection_id)
    return accounts

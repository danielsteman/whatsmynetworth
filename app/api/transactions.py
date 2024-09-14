import logging
from typing import Annotated

from fastapi import APIRouter, BackgroundTasks, Depends, Response
from sqlalchemy.orm.session import Session

from app import schemas
from app.db.session import get_db
from app.dependencies import get_salt_edge_client
from app.repositories import connection_repository, transaction_repository
from app.utils.saltedge.client import SaltEdgeClient

router = APIRouter()
logger = logging.getLogger("uvicorn.error")


@router.post("/sync", response_model=list[schemas.Transaction], tags=["transactions"])
def sync_transactions(
    body: schemas.ListTransactions,
    background_tasks: BackgroundTasks,
    db: Annotated[Session, Depends(get_db)],
    client: Annotated[SaltEdgeClient, Depends(get_salt_edge_client)],
) -> Response:
    connection = connection_repository.get_active_connection(
        db, client=client, identifier=body.identifier
    )
    if not connection:
        msg = f"Could not find active connection for identifier {body.identifier}"
        logger.warning(msg)
        return Response(
            status_code=404,
            content=msg,
        )
    background_tasks.add_task(
        transaction_repository.sync_transactions,
        db=db,
        connection_id=connection.id,
        client=client,
    )
    return Response(status_code=202)

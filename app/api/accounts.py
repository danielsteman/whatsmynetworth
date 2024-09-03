import logging
from typing import Annotated

from fastapi import APIRouter, Depends, Response, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm.session import Session

from app import schemas
from app.db.session import get_db
from app.dependencies import get_salt_edge_client
from app.repositories import account_repository
from app.utils.saltedge.client import SaltEdgeClient

router = APIRouter()
logger = logging.getLogger("uvicorn.error")


@router.post("/", response_model=list[schemas.Account], tags=["accounts"])
async def list_accounts(
    connection_id: str,
    client: Annotated[SaltEdgeClient, Depends(get_salt_edge_client)],
) -> list[schemas.Account]:
    accounts = client.list_accounts(connection_id=connection_id)
    return accounts


@router.post("/create", response_model=schemas.Account, tags=["accounts"])
async def create_account(
    account: schemas.Account,
    db: Annotated[Session, Depends(get_db)],
) -> Response:
    try:
        db_account = account_repository.get_account_by_identifier(db, account.id)
        if db_account:
            logger.info(f"Account {account.id} already exists in database")
            return JSONResponse(
                status_code=status.HTTP_204_NO_CONTENT,
            )
        new_db_account = account_repository.create_account_in_db(db, account)
        return JSONResponse(
            status_code=200,
            content={
                "message": f"new account with id {new_db_account.id} created in database"
            },
        )
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return JSONResponse(status_code=500, content={"error": str(e)})

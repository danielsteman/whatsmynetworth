import logging
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from app import schemas
from app.db.session import get_db
from app.dependencies import get_salt_edge_client
from app.repositories.customer_repository import get_customer_by_identifier
from app.utils.saltedge.client import SaltEdgeClient

router = APIRouter()
logger = logging.getLogger("uvicorn.error")


@router.post("/create", response_model=schemas.ConnectionLink, tags=["connections"])
async def create_connection(
    customer: schemas.CreateConnection,
    client: Annotated[SaltEdgeClient, Depends(get_salt_edge_client)],
    db: Annotated[Session, Depends(get_db)],
) -> schemas.ConnectionLink:
    try:
        customer = get_customer_by_identifier(db, customer.identifier)
        if not customer:
            raise HTTPException(status_code=404, detail="Customer not found")
        created_connection = client.create_connect_session(customer.id)
        return created_connection
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        logger.error(f"Error while creating a connection: {e}", exc_info=True)
        return JSONResponse(
            status_code=500,
            detail="Something went wrong while creating a connection in Saltedge",
        )


@router.post("/callback/success", tags=["connections"])
async def successful_connection_callback() -> Response:
    logger.info("Received success callback")
    return


@router.post("/callback/fail", tags=["connections"])
async def failed_connection_callback() -> Response:
    logger.info("Received fail callback")
    return

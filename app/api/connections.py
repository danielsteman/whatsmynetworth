import logging
from typing import Annotated

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Response
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from app import schemas
from app.db.session import get_db
from app.dependencies import get_salt_edge_client
from app.repositories import (
    account_repository,
    connection_repository,
    customer_repository,
    transaction_repository,
)
from app.repositories.customer_repository import get_customer_by_identifier
from app.utils.saltedge.client import SaltEdgeClient

router = APIRouter()
logger = logging.getLogger("uvicorn.error")


@router.post("/create", response_model=schemas.ConnectionLink, tags=["connections"])
async def create_connection_link(
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
            content="Something went wrong while creating a connection in Saltedge",
        )


@router.post("/", response_model=list[schemas.Connection], tags=["connections"])
async def list_connections(
    customer: schemas.ListConnections,
    client: Annotated[SaltEdgeClient, Depends(get_salt_edge_client)],
    db: Annotated[Session, Depends(get_db)],
) -> list[schemas.Connection]:
    try:
        customer = customer_repository.get_customer_by_identifier(
            db, customer.identifier
        )
        connections = client.list_connections(customer.id)
        return connections
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        logger.error(
            f"Error while listing connections for {customer.identifier}: {e}",
            exc_info=True,
        )
        return JSONResponse(
            status_code=500,
            content=f"Something went wrong while listing Saltedge connections for identifier {customer.identifier}",
        )


@router.post(
    "/get/active", response_model=schemas.Connection | None, tags=["connections"]
)
async def get_newest_active_connection(
    customer: schemas.GetActiveConnection,
    client: Annotated[SaltEdgeClient, Depends(get_salt_edge_client)],
    db: Annotated[Session, Depends(get_db)],
) -> schemas.Connection | None:
    try:
        connection = connection_repository.get_active_connection(
            db, client, customer.identifier
        )
        return connection
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        logger.error(
            f"Error while getting active connection for {customer.identifier}: {e}",
            exc_info=True,
        )
        return JSONResponse(
            status_code=500,
            content=f"Something went wrong while getting active Saltedge connections for customer identifier {customer.identifier}",
        )


@router.post("/callback/success", tags=["connections"])
async def successful_connection_callback(
    callback: schemas.Callback,
    background_tasks: BackgroundTasks,
    client: Annotated[SaltEdgeClient, Depends(get_salt_edge_client)],
    db: Annotated[Session, Depends(get_db)],
) -> Response:
    logger.info("Received success callback")
    if callback.data.stage == "finish":
        logger.info(
            f"Finished fetching accounts and transactions for customer {callback.data.customer_id} using connection {callback.data.connection_id}"
        )
        background_tasks.add_task(
            account_repository.sync_accounts,
            db=db,
            connection_id=callback.data.connection_id,
            client=client,
        )
        background_tasks.add_task(
            transaction_repository.sync_transactions,
            db=db,
            connection_id=callback.data.connection_id,
            client=client,
        )
    logger.debug(f"Success callback request content: {callback.model_dump()}")
    return Response(status_code=202)


@router.post("/callback/notify", tags=["connections"])
async def notify_connection_callback(callback: schemas.Callback) -> Response:
    logger.info("Received notify callback")
    logger.debug(f"Notify callback request content: {callback.model_dump()}")
    return


@router.post("/callback/fail", tags=["connections"])
async def failed_connection_callback(callback: schemas.Callback) -> Response:
    logger.info("Received fail callback")
    logger.debug(f"Fail callback request content: {callback.model_dump()}")
    return

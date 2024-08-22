from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pytest import Session

from app import schemas
from app.db.session import get_db
from app.dependencies import get_salt_edge_client
from app.repositories.customer_repository import get_customer_by_identifier
from app.utils.saltedge.client import SaltEdgeClient

router = APIRouter()


@router.post("/create", response_model=schemas.Customer, tags=["connections"])
async def create_connection(
    customer: schemas.CreateConnection,
    client: Annotated[SaltEdgeClient, Depends(get_salt_edge_client)],
    db: Annotated[Session, Depends(get_db)],
) -> schemas.Connection:
    try:
        customer = get_customer_by_identifier(db, customer.identifier)
        created_connection = client.create_connect_session(customer.id)
        return created_connection
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content=f"Something went wrong while creating a connection: {str(e)}",
        )

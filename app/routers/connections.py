from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from app.dependencies import get_salt_edge_client
from app.models.connection import Connection, CreateConnection
from app.models.customer import Customer
from app.utils.saltedge.client import SaltEdgeClient

router = APIRouter()


@router.post("/create", response_model=Customer, tags=["connections"])
async def create_connection(
    customer: CreateConnection,
    client: Annotated[SaltEdgeClient, Depends(get_salt_edge_client)],
) -> Connection:
    try:
        created_connection = client.create_connect_session(customer.id)
        return created_connection
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content=f"Something went wrong while creating a connection: {str(e)}",
        )

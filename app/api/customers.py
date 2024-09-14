import logging
from typing import Annotated

from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm.session import Session

from app import schemas
from app.db.session import get_db
from app.dependencies import get_salt_edge_client
from app.utils.saltedge.client import CustomerAlreadyExists, SaltEdgeClient

router = APIRouter()
logger = logging.getLogger("uvicorn.error")


@router.post(
    "/create",
    response_model=schemas.Customer,
    responses={204: {"model": None}},
    tags=["customers"],
)
async def create_customer(
    customer: schemas.CreateCustomer,
    client: Annotated[SaltEdgeClient, Depends(get_salt_edge_client)],
    db: Annotated[Session, Depends(get_db)],
) -> schemas.Customer:
    try:
        created_customer = client.create_customer(customer.id)
        return created_customer
    except CustomerAlreadyExists:
        logger.info("Customer already exists in Saltedge")
        return JSONResponse(
            content="Customer already exists in Saltedge",
            status_code=status.HTTP_204_NO_CONTENT,
        )
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return JSONResponse(status_code=500, content={"error": str(e)})

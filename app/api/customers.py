import logging
from typing import Annotated

from fastapi import APIRouter, Depends, Response, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm.session import Session

from app import schemas
from app.db.session import get_db
from app.dependencies import get_salt_edge_client
from app.repositories import customer_repository
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

        db_customer = customer_repository.get_customer_by_identifier(db, customer.id)
        if db_customer:
            logger.info("Customer already exists in the database")
            return Response(status_code=status.HTTP_204_NO_CONTENT)

        created_customer = client.create_customer(customer.id)

        db_customer = customer_repository.create_customer_in_db(
            db=db,
            id=created_customer.id,
            identifier=created_customer.identifier,
            secret=created_customer.secret,
            created_at=created_customer.created_at,
            updated_at=created_customer.updated_at,
        )

        return created_customer
    except CustomerAlreadyExists:
        logger.info("Customer already exists in Saltedge")
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return JSONResponse(status_code=500, content={"error": str(e)})

from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from app.dependencies import get_salt_edge_client
from app.models.customer import CreateCustomer, Customer
from app.utils.saltedge.client import CustomerAlreadyExists, SaltEdgeClient

router = APIRouter()


@router.post("/create", response_model=Customer, tags=["customers"])
async def create_customer(
    customer: CreateCustomer,
    client: Annotated[SaltEdgeClient, Depends(get_salt_edge_client)],
) -> Customer:
    try:
        created_customer = client.create_customer(customer.id)
        return created_customer
    except CustomerAlreadyExists as e:
        return JSONResponse(status_code=200, content=e.message)
    except Exception as e:
        return JSONResponse(status_code=500, content=str(e))

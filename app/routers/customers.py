from typing import Annotated

from fastapi import APIRouter, Depends

from app.dependencies import get_salt_edge_client
from app.models.customer import CreateCustomer, Customer
from app.utils.saltedge.client import SaltEdgeClient

router = APIRouter()


@router.post("/create", response_model=Customer, tags=["customers"])
async def create_customer(
    customer: CreateCustomer,
    client: Annotated[SaltEdgeClient, Depends(get_salt_edge_client)],
) -> Customer:
    customer = client.create_customer(customer.id)
    return customer

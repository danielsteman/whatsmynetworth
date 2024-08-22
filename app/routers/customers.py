from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm.session import Session

from app import models, schemas
from app.dependencies import get_db, get_salt_edge_client
from app.utils.saltedge.client import CustomerAlreadyExists, SaltEdgeClient

router = APIRouter()


@router.post("/create", response_model=models.Customer, tags=["customers"])
async def create_customer(
    customer: models.CreateCustomer,
    client: Annotated[SaltEdgeClient, Depends(get_salt_edge_client)],
    db: Annotated[Session, Depends(get_db)],
) -> models.Customer:
    try:
        db_customer = (
            db.query(schemas.Customer).filter_by(identifier=customer.id).first()
        )
        if db_customer:
            return JSONResponse(
                status_code=400, content="Customer already exists in the database"
            )

        created_customer = client.create_customer(customer.id)

        db_customer = schemas.Customer(
            id=created_customer.id,
            identifier=created_customer.identifier,
            secret=created_customer.secret,
            updated_at=created_customer.updated_at,
            created_at=created_customer.created_at,
        )
        db.add(db_customer)
        db.commit()
        db.refresh(db_customer)

        return created_customer
    except CustomerAlreadyExists as e:
        return JSONResponse(status_code=200, content=e.message)
    except Exception as e:
        return JSONResponse(status_code=500, content=str(e))

from datetime import datetime

from pydantic import BaseModel


class Customer(BaseModel):
    id: str
    identifier: str
    secret: str
    updated_at: datetime
    created_at: datetime

    class Config:
        orm_mode = True


class CreateCustomer(BaseModel):
    id: str


class DeletedCustomer(BaseModel):
    id: str
    deleted: bool

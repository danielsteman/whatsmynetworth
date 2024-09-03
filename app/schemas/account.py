from datetime import datetime

from pydantic import BaseModel


class Account(BaseModel):
    id: str
    name: str
    nature: str
    balance: float
    currency_code: str
    connection_id: str
    created_at: datetime
    updated_at: datetime


class ListAccounts(BaseModel):
    identifier: str

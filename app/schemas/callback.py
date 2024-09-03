from typing import Any, Dict

from pydantic import BaseModel


class Data(BaseModel):
    connection_id: str
    customer_id: str
    custom_fields: Dict[str, Any]
    stage: str


class Meta(BaseModel):
    version: str
    time: str


class Callback(BaseModel):
    data: Data
    meta: Meta

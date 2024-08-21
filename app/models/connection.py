from pydantic import BaseModel


class Connection(BaseModel):
    id: str


class CreateConnection(BaseModel):
    id: str

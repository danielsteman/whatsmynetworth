from pydantic import BaseModel


class Connection(BaseModel):
    expires_at: str
    connect_url: str


class CreateConnection(BaseModel):
    identifier: str

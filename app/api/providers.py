from typing import Annotated

from fastapi import APIRouter, Depends

from app.dependencies import get_salt_edge_client
from app.schemas.provider import Provider
from app.utils.saltedge.client import SaltEdgeClient

router = APIRouter()


@router.get("/", response_model=list[Provider], tags=["providers"])
async def get_all_providers(
    client: Annotated[SaltEdgeClient, Depends(get_salt_edge_client)],
) -> list[Provider]:
    providers = client.list_providers()
    return providers

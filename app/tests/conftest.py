import pytest

from app.utils.saltedge.client import SaltEdgeClient


@pytest.fixture
def client():
    return SaltEdgeClient()

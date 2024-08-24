import pytest

from app.utils.saltedge.client import SaltEdgeClient


@pytest.fixture
def client():
    return SaltEdgeClient()


@pytest.fixture
def consented_customer_id():
    """
    The id of a test customer that gave consent to fetch data from fake bank
    """
    customer_id = "1348870464449026771"
    return customer_id

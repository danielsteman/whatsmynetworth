import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.db.base import Base
from app.utils.saltedge.client import SaltEdgeClient


@pytest.fixture
def client():
    return SaltEdgeClient()


@pytest.fixture
def consented_customer_id():
    """
    The id of a test customer that gave consent to fetch data from fake bank
    This id is set manually, not ideal, but mocking is too much work
    """
    customer_id = "1348870464449026771"
    return customer_id


@pytest.fixture
def db():
    engine = create_engine(settings.test_database_url)
    Base.metadata.create_all(bind=engine)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)

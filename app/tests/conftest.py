import hashlib
from datetime import datetime

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app import models
from app.core.config import settings
from app.db.base import Base
from app.utils.saltedge.client import SaltEdgeClient

MOCK_CUSTOMER_ID = "1348870464449026771"
MOCK_CUSTOMER_IDENTIFIER = "cm051ltey00001utwf0wxrk1v"
MOCK_ACCOUNT_ID = "1362549615680821959"
MOCK_CONNECTION_ID = "1362549497879599722"


@pytest.fixture
def client():
    return SaltEdgeClient()


@pytest.fixture
def consented_customer_id():
    """
    The id of a test customer that gave consent to fetch data from fake bank
    This id is set manually, not ideal, but mocking is too much work
    """
    return MOCK_CUSTOMER_ID


@pytest.fixture
def consented_customer_identifier():
    """
    The id of a test customer that gave consent to fetch data from fake bank
    This id is set manually, not ideal, but mocking is too much work
    """
    return MOCK_CUSTOMER_IDENTIFIER


@pytest.fixture
def consented_account_id():
    return MOCK_ACCOUNT_ID


@pytest.fixture
def consented_connection_id():
    return MOCK_CONNECTION_ID


@pytest.fixture
def db():
    """
    Use test database url to make a connection
    Use Base to make sure all tables exist before each test
    Use Base.drop_all after each test to remove all tables
    For exquisite reproducability
    """
    engine = create_engine(settings.test_database_url)
    Base.metadata.create_all(bind=engine)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture
def test_customer(db):
    """
    Yeet a test customer in the database
    which will be removed because all tables are dropped
    after each test
    """
    customer = models.Customer(
        id=MOCK_CUSTOMER_ID,
        identifier=MOCK_CUSTOMER_IDENTIFIER,
        secret=hashlib.sha256(b"mock_secret").hexdigest(),
        updated_at=datetime(2024, 7, 7),
        created_at=datetime(2024, 7, 7),
    )
    db.add(customer)
    db.commit()
    db.refresh(customer)
    return customer

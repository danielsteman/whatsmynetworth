from datetime import datetime, timezone

import pytest

from app import schemas
from app.repositories import connection_repository


@pytest.fixture
def dummy_connection():
    return schemas.Connection(
        country_code="XF",
        created_at=datetime(2024, 8, 26, 13, 25, 40, tzinfo=timezone.utc),
        customer_id="1348870464449026771",
        daily_refresh=False,
        id="1351736641374394989",
        secret="VPmm-vm4bc5HLXZvfMJnHZCFQTC4wq3j2t2aRbzFL_4",
        categorization="personal",
        show_consent_confirmation=True,
        last_consent_id="1351736641760270960",
        last_attempt=schemas.LastAttempt(
            attempt_id="la1234567890",
            timestamp=datetime(2024, 8, 26, 13, 20, 40, tzinfo=timezone.utc),
            success=True,
        ),
        holder_info=schemas.HolderInfo(
            holder_name="John Doe", holder_address="1234 Test St, Test City, XF"
        ),
        last_success_at=datetime(2024, 8, 26, 13, 26, 38, tzinfo=timezone.utc),
        next_refresh_possible_at=datetime(2024, 8, 26, 13, 41, 38, tzinfo=timezone.utc),
        provider_id="3834",
        provider_code="rabobank_oauth_client_nl_xf",
        provider_name="Rabobank (Sandbox)",
        status="active",
        store_credentials=True,
        updated_at=datetime(2024, 8, 26, 13, 26, 38, tzinfo=timezone.utc),
    )


def test_create_connection_link(client):
    mock_id = "123"
    try:
        customer = client.create_customer(mock_id)
        customer_id = customer.id
        connect_session = client.create_connect_session(customer_id)
        assert connect_session
        assert isinstance(connect_session, schemas.ConnectionLink)
    finally:
        client.delete_customer(customer_id)


def test_get_connections(client, consented_customer_id):
    connection = client.get_connections(consented_customer_id)
    assert connection


def test_create_db_connection(db, dummy_connection):
    connection_repository.create_connection(db, dummy_connection)

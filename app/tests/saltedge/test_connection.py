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
        last_attempt=schemas.connection.LastAttempt(
            api_mode="sandbox",
            api_version="v1",
            automatic_fetch=True,
            user_present=True,
            daily_refresh=False,
            categorize=True,
            created_at=datetime(2024, 8, 26, 13, 20, 40, tzinfo=timezone.utc),
            customer_last_logged_at=None,
            custom_fields={"field1": "value1"},
            device_type="desktop",
            remote_ip="127.0.0.1",
            exclude_accounts=["account1", "account2"],
            fail_at=None,
            fail_error_class=None,
            fail_message=None,
            fetch_scopes=["transactions", "accounts"],
            finished=True,
            finished_recent=True,
            from_date=None,
            id="la1234567890",
            interactive=True,
            locale="en-US",
            partial=False,
            store_credentials=True,
            success_at=datetime(2024, 8, 26, 13, 26, 38, tzinfo=timezone.utc),
            to_date=None,
            unduplication_strategy="default",
            updated_at=datetime(2024, 8, 26, 13, 26, 38, tzinfo=timezone.utc),
            show_consent_confirmation=True,
            consent_id="1351736641760270960",
            include_natures=["nature1", "nature2"],
            last_stage=schemas.connection.LastStage(
                created_at=datetime(2024, 8, 26, 13, 25, 40, tzinfo=timezone.utc),
                id="stage123",
                interactive_fields_names=["field1", "field2"],
                interactive_html="<html></html>",
                name="stage_name",
                updated_at=datetime(2024, 8, 26, 13, 26, 40, tzinfo=timezone.utc),
            ),
        ),
        holder_info=schemas.connection.HolderInfo(
            names=["John Doe"],
            emails=["johndoe@example.com"],
            phone_numbers=["+1234567890"],
            addresses=[
                schemas.connection.Address(
                    city="Test City",
                    state="Test State",
                    street="1234 Test St",
                    country_code="XF",
                    post_code="12345",
                )
            ],
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
    db_connection = connection_repository.create_connection(db, dummy_connection)
    assert db_connection.id == 1351736641374394989

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}


def test_list_accounts_route(consented_customer_identifier):
    response = client.post(
        "/api/accounts", json={"identifier": consented_customer_identifier}
    )
    accounts = response.json()
    assert accounts


def test_list_connections_route(consented_customer_identifier):
    response = client.post(
        "/api/connections",
        json={"identifier": consented_customer_identifier},
    )
    connections = response.json()
    assert connections
    assert len(connections) > 0

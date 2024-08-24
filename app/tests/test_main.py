from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}


def test_list_accounts_route(consented_customer_id):
    response = client.post(
        "/api/accounts", data={"connection_id": consented_customer_id}
    )
    print(response.json())

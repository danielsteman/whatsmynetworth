from fastapi import FastAPI, Depends
from fastapi.responses import FileResponse
from plaid.model.country_code import CountryCode
from plaid.model.products import Products
import os
import plaid
from plaid.api import plaid_api
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from dotenv import load_dotenv

load_dotenv()


app = FastAPI()
favicon_path = "whatsmynetworth/favicon.ico"


@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse(favicon_path)


def get_plaid_client():
    try:
        client_id = os.environ["CLIENT_ID"]
        secret = os.environ["SECRET"]
    except KeyError:
        raise ValueError("CLIENT_ID and SECRET must be set")

    # Available environments are
    # 'Production'
    # 'Sandbox'
    configuration = plaid.Configuration(
        host=plaid.Environment.Sandbox,
        api_key={
            "clientId": client_id,
            "secret": secret,
        },
    )

    api_client = plaid.ApiClient(configuration)
    client = plaid_api.PlaidApi(api_client)
    return client


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/api/link/token/create")
def get_link_token(client: plaid_api.PlaidApi = Depends(get_plaid_client)):
    request = LinkTokenCreateRequest(
        user=LinkTokenCreateRequestUser(client_user_id="asfafasasffasf"),
        client_name="Daniel Steman",
        products=[
            Products("auth"),
            Products("transactions"),
        ],
        country_codes=[CountryCode("NL")],
        language="en",
    )

    # Generate the link token
    response = client.link_token_create(request)
    link_token = response["link_token"]

    return {"link_token": link_token}

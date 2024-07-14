from plaid.model.country_code import CountryCode
from plaid.model.products import Products
import os
import plaid
from plaid.api import plaid_api
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from dotenv import load_dotenv

load_dotenv()

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

request = LinkTokenCreateRequest(
    user=LinkTokenCreateRequestUser(
        client_user_id="asfafasasffasf"  # This should be a unique identifier for the user in your system
    ),
    client_name="Daniel Steman",
    products=[
        Products("auth"),
        Products("transactions"),
    ],  # Specify the products you need access to
    country_codes=[CountryCode("NL")],  # Specify the country codes you need access to
    language="en",
)

# Generate the link token
response = client.link_token_create(request)
link_token = response["link_token"]

print(f"Link token: {link_token}")

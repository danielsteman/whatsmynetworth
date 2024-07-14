import os
import plaid
from plaid.api import plaid_api

client_id = os.environ.get("CLIENT_ID")
secret = os.environ.get("SECRET")

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

from app.utils.saltedge.client import SaltEdgeClient


def test_list_providers():
    client = SaltEdgeClient()
    providers = client.list_providers(country_code=None)
    print(providers)
    assert len(providers) > 0

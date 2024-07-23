from app.utils.saltedge.client import SaltEdgeClient


def test_list_providers_at_least_one():
    client = SaltEdgeClient()
    providers = client.list_providers(country_code=None)
    assert len(providers) > 0, "expected at least one provider"

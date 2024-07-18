from app.utils.saltedge import SaltEdgeClient


def test_list_providers():
    client = SaltEdgeClient()
    providers = client.list_providers()
    print(providers)
    assert len(providers) > 0

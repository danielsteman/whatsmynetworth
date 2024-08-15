from app.models.provider import Provider


def test_list_providers_at_least_one(client):
    providers = client.list_providers(country_code=None)
    assert len(providers) > 0, "expected at least one provider"


def test_validate_all_providers_in_list(client):
    providers = client.list_providers(country_code=None)
    for p in providers:
        assert isinstance(p, Provider)

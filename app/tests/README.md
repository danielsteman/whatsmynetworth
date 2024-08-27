# Tests

## Database

### Migrations

Migrations are ran from `/web` using `yarn migrate:postgres-test` and from `/app` using `alembic -x url=postgresql://test_admin:test_admin@localhost:5433/test_stacks upgrade head`

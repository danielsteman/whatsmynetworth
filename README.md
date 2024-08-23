# whatsmynetworth

```zsh
rye run api
rye run web
docker-compose up
```

Or run all tasks in VSCode.

## Sec

Generate public key:

```zsh
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

## DB

```bash
docker-compose up
```

Migrations for next-auth are done from `/web`.

```bash
cd web
yarn migrate:postgres
```

Other migrations are done from `/app`.

```bash
cd app
alembic upgrade head
```

Open interactive postgres shell for debugging.

```
psql -h localhost -p 5432 -d stacks -U admin
```

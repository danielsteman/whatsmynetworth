# whatsmynetworth

```zsh
rye run api
rye run web
```

## Sec

Generate public key:

```zsh
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

## Init DB

```
docker-compose up
yarn migrate:postgres
```

Check DB

```
psql -h localhost -p 5432 -d stacks -U admin
```

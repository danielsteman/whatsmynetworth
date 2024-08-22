from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.responses import FileResponse

from app.api import connections, customers, providers

load_dotenv()


app = FastAPI()
favicon_path = "app/favicon.ico"


@app.get("/favicon.ico", include_in_schema=False)
async def favicon() -> FileResponse:
    return FileResponse(favicon_path)


@app.get("/")
async def root() -> dict:
    return {"message": "Hello World"}


app.include_router(providers.router, prefix="/api/providers")
app.include_router(customers.router, prefix="/api/customers")
app.include_router(connections.router, prefix="/api/connections")

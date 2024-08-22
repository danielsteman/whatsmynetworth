from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from app.api import connections, customers, providers

app = FastAPI()

cors_origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/favicon.ico", include_in_schema=False)
async def favicon() -> FileResponse:
    return FileResponse("app/favicon.ico")


@app.get("/")
async def root() -> dict:
    return {"message": "Hello World"}


app.include_router(providers.router, prefix="/api/providers")
app.include_router(customers.router, prefix="/api/customers")
app.include_router(connections.router, prefix="/api/connections")

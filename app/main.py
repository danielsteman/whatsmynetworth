from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.responses import FileResponse

from app.routers import providers

load_dotenv()


app = FastAPI()
favicon_path = "app/favicon.ico"


@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse(favicon_path)


@app.get("/")
async def root():
    return {"message": "Hello World"}


app.include_router(providers.router, prefix="/api/providers")

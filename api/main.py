from __future__ import annotations
from contextlib import asynccontextmanager
from sqlmodel import SQLModel
from database import engine

from fastapi import FastAPI,Request
from fastapi.responses import JSONResponse
from http import HTTPStatus
from util.exceptions import EmptyIteratorException
from endpoints.vms.routers import router as vms_router
from endpoints.logs.routers import router as logs_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    SQLModel.metadata.create_all(engine)
    yield
    
app = FastAPI(
    title="Milko API",
    version="1.0.0",
    description="Milko API allows you to check whether the milk is fine or spoiled.",
    license={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0",
    },
    lifespan=lifespan
)

@app.exception_handler(EmptyIteratorException)
async def empty_iterator_exception_handler(request: Request, exception: EmptyIteratorException):
    return JSONResponse(
        status_code=HTTPStatus.NOT_FOUND,
        content={'error':'No rows'}
    )

app.include_router(vms_router)
app.include_router(logs_router)
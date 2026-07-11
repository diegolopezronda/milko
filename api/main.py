from __future__ import annotations

from contextlib import asynccontextmanager
from sqlmodel import SQLModel
from database import engine
from fastapi import FastAPI,Request
from fastapi.responses import JSONResponse
from http import HTTPStatus
from util.exceptions import EmptyIteratorException
from fastapi.middleware.cors import CORSMiddleware
from endpoints.auth.routers import router as auths_router
from endpoints.auth.schemas import azure_scheme
from endpoints.auth.schemas import settings
from endpoints.vms.routers import router as vms_router
from endpoints.logs.routers import router as logs_router
from endpoints.qa.routers import router as qas_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    await azure_scheme.openid_config.load_config()
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
    lifespan=lifespan,
    swagger_ui_oauth2_redirect_url="/docs/oauth2-redirect",
    swagger_ui_init_oauth={
        "usePkceWithAuthorizationCodeGrant": True,
        "clientId": settings.APP_CLIENT_ID,
        "scopes": f"api://{settings.APP_CLIENT_ID}/access_as_user",
    },
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_SOCKET_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(EmptyIteratorException)
async def empty_iterator_exception_handler(request: Request, exception: EmptyIteratorException):
    return JSONResponse(
        status_code=HTTPStatus.NOT_FOUND,
        content={'error':'No rows'}
    )

app.include_router(auths_router)
app.include_router(vms_router)
app.include_router(logs_router)
app.include_router(qas_router)
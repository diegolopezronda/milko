from fastapi import APIRouter, Security, Depends, HTTPException, status
from fastapi_azure_auth.user import User
from .schemas import azure_scheme
from .utils import allow_roles

router = APIRouter(
    prefix="/auth",
    tags=["Authentication and authorization"],
    responses={404: {"description": "Not found"}},
)

@router.get("/authenticated", summary="A test that any authenticated user will pass.")
async def protected_route(user: User = Security(azure_scheme)):
    return {
        "message": f"Hello, {user.name}!",
        "email": user.claims.get("preferred_username"),
    }


@router.get("/analyst", summary="A test that any analyst user will pass.")
async def admin_route(
    user: User = Depends(allow_roles(["analyst"])),
):
    return {
        "message": f"Hello, {user.name}! I see your are an analyst",
        "email": user.claims.get("preferred_username"),
    }

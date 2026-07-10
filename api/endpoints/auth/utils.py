
from fastapi import Security, HTTPException, status, Depends
from fastapi_azure_auth.user import User
from .schemas import azure_scheme

def allow_roles(allowed_roles: list[str]):
    def dependency(user: User = Security(azure_scheme)):
        if not any(role in user.roles for role in allowed_roles):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Requires one of these roles: {allowed_roles}"
            )
        return user
    return dependency
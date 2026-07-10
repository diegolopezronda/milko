from fastapi_azure_auth import SingleTenantAzureAuthorizationCodeBearer
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    TENANT_ID: str
    APP_CLIENT_ID: str
    class Config:
        env_file = '.env_var'

settings = Settings()

azure_scheme = SingleTenantAzureAuthorizationCodeBearer(
    app_client_id=settings.APP_CLIENT_ID,
    tenant_id=settings.TENANT_ID,
    scopes={
        f'api://{settings.APP_CLIENT_ID}/access_as_user': 'access_as_user',
    }
)
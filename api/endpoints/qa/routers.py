from fastapi import APIRouter, Depends, Query
from typing import Annotated
from fastapi_azure_auth.user import User
import random
from .schemas import MilkQualityFeatures, MilkQuality
from ..auth.utils import allow_roles

router = APIRouter(
    prefix="/qa",
    tags=["Milk Quality"],
    responses={404: {"description": "Not found"}},
)


@router.get("/calculate", summary="Calculates the milk quality based on it features.")
async def get_calculate(
    features: Annotated[
        MilkQualityFeatures, Query(description="The features to evaluate.")
    ],
    user: User = Depends(allow_roles(["analyst"])),
):
    quality = random.randint(1, 3)
    return MilkQuality(quality=quality)

from pydantic import BaseModel, Field
from enum import Enum

class MilkQualityFeatures(BaseModel):
    """
    Milk Quality Features
    """
    ph: float = Field(description="pH.",examples=[7.34],gte=0,lte=14)
    temperature: float = Field(description="Temperature.",examples=[36.3],gte=-273,lte=273)
    taste: bool = Field(description="Taste. True when is good, otherwise bad.")
    odor: bool = Field(description="Odor. True when is good, otherwise bad.")
    fat: bool = Field(description="Fat content. True when is high, otherwise low.")
    turbidity: bool = Field(description="The cloudiness or haziness of the milk. True when is high, otherwise low.")
    colour: int = Field(description="How clear the milk is, 255 is white, 0 is yellow.",examples=[23],gte=0,lte=255)

class MilkQuality(BaseModel):
    quality: int = Field(description="Milk Quality.",examples=[0,1,2],gte=0,lte=2)
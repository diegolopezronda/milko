from pydantic import BaseModel, Field
from enum import Enum

class Image(Enum):
    '''
    Operating system images.
    '''
    ubuntu = 'ubuntu:24.04'
    debian = 'debian:bookworm'
    alpine = 'alpine:3.20'

class Vm(BaseModel):
    """
    Virtual Machine.
    """

    cpu_count: int = Field(description="CPUs", examples=[8], gt=1, lt=65)
    mem_size: int = Field(
        description="RAM memory size", examples=[16], gt=8, lt=1025, multiple_of=8
    )
    image: Image = Field(
        description="OS Image.", examples=["debian:bookworm"]
    )

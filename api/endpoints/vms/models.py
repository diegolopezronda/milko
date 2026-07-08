from sqlmodel import Field, SQLModel
from typing import Literal

class Vm(SQLModel, table=True):
    """
    Virtual Machine.
    """

    id: int | None = Field(default=None, primary_key=True)
    cpu_count: int
    mem_size: int
    image: str

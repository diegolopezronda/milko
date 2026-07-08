from fastapi import APIRouter, Depends, Path
from typing import Annotated
from sqlmodel import Session
from database import get_session
from .services import insert_vm, delete_vm
from .schemas import Vm

router = APIRouter(
    prefix="/vm",
    tags=["Virtual Machines"],
    responses={404: {"description": "Not found"}},
)


@router.post("/start", summary="Creates and starts a new virtual machine.")
def post_start(vm: Vm, session: Session = Depends(get_session)):
    vm = insert_vm(vm, session)
    return {"id": vm.id}


@router.post("/{id}/stop", summary="Shutdowns and removes a virtual machine.")
def post_id_stop(
    id: Annotated[int, Path(description="The virtual machine ID.", gt=0)],
    session: Session = Depends(get_session),
):
    vm = delete_vm(id, session)
    del vm.id
    return {"id": id, "spec": vm}

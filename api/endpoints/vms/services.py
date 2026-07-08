from .schemas import Vm
from .models import Vm as Vm_model
from fastapi import  HTTPException
from sqlmodel import Session

def insert_vm(vm: Vm, session: Session) -> Vm:
    db_vm = Vm_model.model_validate(vm)
    session.add(db_vm)
    session.commit()
    session.refresh(db_vm)
    return db_vm


def delete_vm(id: str, session:Session) -> Vm:
    vm = session.get(Vm_model, id)
    if not vm:
        raise HTTPException(status_code=404, detail="VM not found")
    session.delete(vm)
    session.commit()
    return vm

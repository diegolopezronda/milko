from fastapi import APIRouter, Request, Response, Query
from typing import Annotated
from http import HTTPStatus
from .services import query_logs
from util.parsers import to_csv
from util.exceptions import EmptyIteratorException

router = APIRouter(
    prefix="/logs",
    tags=["Logs"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", summary="Reads a quantity of logs from an starting point.")
async def get_all(
    offset: Annotated[
        int, Query(gt=-1, description="Quantity of records to skip.")
    ] = 0,
    count: Annotated[
        int, Query(gt=0, description="Quantity of records to show.")
    ] = 100,
    request: Request = None,
):
    logs = list(query_logs(offset, count))
    if not logs:
        raise EmptyIteratorException()
    accept = request.headers.get("Accept")
    if accept == "text/csv":
        out = to_csv(logs, ["level", "time", "message"])
        return Response(out, status_code=HTTPStatus.OK, media_type="text/csv")
    return logs

from fastapi import APIRouter, status

from core import (
    ErrorResponsesDict,
    PaginationQuery,
    Service,
    ServiceRead,
    service_not_found,
)

router = APIRouter(prefix="/services", tags=["Services"])


@router.get("")
async def read_many(pagination: PaginationQuery) -> list[ServiceRead]:
    services = await Service.find_all(
        pagination.skip, pagination.limit, fetch_links=True
    ).to_list()
    return [ServiceRead(**service.model_dump()) for service in services]


@router.delete("", status_code=status.HTTP_204_NO_CONTENT)
async def remove_many(pagination: PaginationQuery) -> None:
    await Service.find_all(pagination.skip, pagination.limit).delete()


@router.get("/{service_id}", responses=ErrorResponsesDict("not_found"))
async def read_one(service_id: str) -> ServiceRead:
    service = await Service.get(service_id, fetch_links=True)
    if service is None:
        raise service_not_found
    return ServiceRead(**service.model_dump())


@router.delete(
    "/{service_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    responses=ErrorResponsesDict("not_found"),
)
async def remove_one(service_id: str) -> None:
    service = await Service.get(service_id)
    if service is None:
        raise service_not_found
    await service.delete()

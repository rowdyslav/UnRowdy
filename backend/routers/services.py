from fastapi import APIRouter, status

from core import (
    ErrorResponsesDict,
    PaginationQuery,
    Service,
    ServiceQuery,
    ServiceRead,
    service_not_found,
)

router = APIRouter(prefix="/services", tags=["Services"])


@router.get("")
async def read_many(pagination: PaginationQuery, q: ServiceQuery) -> list[ServiceRead]:
    cn = q.category_name
    services = Service.find(
        q.model_dump(exclude={"category_name"}, exclude_none=True),
        skip=pagination.skip,
        limit=pagination.limit,
    )
    if cn is not None:
        services = services.find(Service.category.name == cn, fetch_links=True)
    return await services.to_list()


@router.delete("", status_code=status.HTTP_204_NO_CONTENT)
async def remove_many(pagination: PaginationQuery) -> None:
    await Service.find_all(pagination.skip, pagination.limit).delete()


@router.get("/{service_id}", responses=ErrorResponsesDict("not_found"))
async def read_one(service_id: str) -> ServiceRead:
    service = await Service.get(service_id, fetch_links=True)
    if service is None:
        raise service_not_found
    return service


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

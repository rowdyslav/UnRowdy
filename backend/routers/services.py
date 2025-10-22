from beanie.operators import Or, RegEx
from fastapi import APIRouter, status

from core import (
    ErrorResponsesDict,
    PaginationQuery,
    Service,
    ServiceQuery,
    ServiceRead,
    ServiceUpdate,
    service_not_found,
)

router = APIRouter(prefix="/services", tags=["Services"])


@router.get("")
async def read_many(pagination: PaginationQuery, q: ServiceQuery) -> list[ServiceRead]:
    services = Service.find_all(pagination.skip, pagination.limit)
    if (cn := q.category_name) is not None:
        services = services.find(Service.category.name == cn, fetch_links=True)
        if k := q.keywords.split():
            services = services.find(
                Or(
                    *[RegEx(Service.name, kw, "i") for kw in k],
                    *[RegEx(Service.description, kw, "i") for kw in k],
                ),
            )
    return await services.find(
        q.max_price >= Service.price >= q.min_price, fetch_links=True
    ).to_list()


@router.delete("", status_code=status.HTTP_204_NO_CONTENT)
async def remove_many(pagination: PaginationQuery) -> None:
    await Service.find_all(pagination.skip, pagination.limit).delete()


@router.get("/{service_id}", responses=ErrorResponsesDict("not_found"))
async def read_one(service_id: str) -> ServiceRead:
    service = await Service.get(service_id, fetch_links=True)
    if service is None:
        raise service_not_found
    return service


@router.patch("/{service_id}", responses=ErrorResponsesDict("not_found"))
async def edit_one(service_id: str, u: ServiceUpdate) -> ServiceRead:
    service = await Service.get(service_id, fetch_links=True)
    if service is None:
        raise service_not_found
    return await service.set(u.model_dump(exclude_none=True))


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

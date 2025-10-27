from beanie.operators import Or, RegEx
from fastapi import APIRouter, Response, status

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
async def read_many(
    r: Response, pagination: PaginationQuery, q: ServiceQuery
) -> list[ServiceRead]:
    services = Service.find(Service.category.name == q.category_name, fetch_links=True)

    r.headers[h := "category-maxprice"] = str(
        max(await services.to_list(), key=lambda x: x.price).price
    )
    r.headers["Access-Control-Expose-Headers"] = h

    if k := q.keywords.split():
        services = services.find(
            Or(
                *[
                    RegEx(f, kw, "i")
                    for kw in k
                    for f in [Service.name, Service.description]
                ],
            ),
        )

    return await services.find(
        q.max_price >= Service.price,
        Service.price >= q.min_price,
        skip=pagination.skip,
        limit=pagination.limit,
        fetch_links=True,
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

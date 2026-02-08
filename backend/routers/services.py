from beanie import PydanticObjectId
from beanie.operators import NE, In, Or, RegEx
from fastapi import APIRouter, Response, status

from core import (
    ErrorResponsesDict,
    PaginationQuery,
    Service,
    ServiceQuery,
    ServiceRead,
    ServiceUpdate,
    User,
    service_not_found,
)

router = APIRouter(prefix="/services", tags=["Services"])


async def _tg_usernames_by_service_id() -> dict[PydanticObjectId, str | None]:
    users = await User.find(NE(User.tg, None), fetch_links=True).to_list()
    usernames_by_service_id: dict[PydanticObjectId, str | None] = {}

    for user in users:
        tg_username = user.tg.tgusername if user.tg is not None else None
        for service in user.services:
            service_id = getattr(service, "id", None)
            if service_id is None and hasattr(service, "ref"):
                service_id = getattr(service.ref, "id", None)
            if service_id is None:
                continue
            usernames_by_service_id[service_id] = tg_username

    return usernames_by_service_id


@router.get("")
async def read_many(
    r: Response, pagination: PaginationQuery, q: ServiceQuery
) -> list[ServiceRead]:
    services = Service.find(Service.category.name == q.category_name, fetch_links=True)
    tg_usernames_by_service_id: dict[PydanticObjectId, str | None] = {}

    if q.tma:
        tg_usernames_by_service_id = await _tg_usernames_by_service_id()
        if not tg_usernames_by_service_id:
            r.headers[h := "category-maxprice"] = "0"
            r.headers["Access-Control-Expose-Headers"] = h
            return []
        services = services.find(In(Service.id, list(tg_usernames_by_service_id)))

    category_services = await services.to_list()
    r.headers[h := "category-maxprice"] = str(
        max((service.price or 0) for service in category_services)
        if category_services
        else 0
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

    max_price = q.max_price if q.max_price is not None else 0x7FFFFFFFFFFFFFFF
    filtered_services = await services.find(
        max_price >= Service.price,
        Service.price >= q.min_price,
        skip=pagination.skip,
        limit=pagination.limit,
        fetch_links=True,
    ).to_list()

    if not q.tma:
        return filtered_services

    return [
        ServiceRead(
            **service.model_dump(),
            tg_username=tg_usernames_by_service_id.get(service.id),
        )
        for service in filtered_services
    ]


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

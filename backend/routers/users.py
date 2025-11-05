from beanie import PydanticObjectId
from fastapi import APIRouter, status

from core import (
    AuthorizedUser,
    ErrorResponsesDict,
    FriendType,
    PaginationQuery,
    Service,
    ServiceCreate,
    ServiceRead,
    User,
    UserQuery,
    UserRead,
    already_friend_or_request,
    friend_request_yourself,
    service_category_not_found,
    user_no_friend_or_request,
    user_not_found,
)
from core.models import ServiceCategory

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("")
async def read_many(pagination: PaginationQuery, q: UserQuery) -> list[UserRead]:
    return await User.find(
        q.model_dump(), skip=pagination.skip, limit=pagination.limit
    ).to_list()


@router.get("/me/", responses=ErrorResponsesDict("unauthorized"))
async def read_me(me: AuthorizedUser) -> UserRead:
    return me


@router.get("/me/services/", responses=ErrorResponsesDict("unauthorized"))
async def read_me_services(me: AuthorizedUser) -> list[ServiceRead]:
    await me.fetch_link(User.services)
    return me.services


@router.post("/me/services/", status_code=status.HTTP_201_CREATED)
async def add_me_services(me: AuthorizedUser, service_in: ServiceCreate) -> ServiceRead:
    category = await ServiceCategory.get(service_in.category_id)
    if category is None:
        raise service_category_not_found

    service = Service(
        user=me,
        category=category,
        **service_in.model_dump(exclude={"category_id"}, exclude_unset=True),
    )
    await service.insert()

    me.services.append(service)
    await me.save()

    return service


@router.delete(
    "/me/services/",
    status_code=status.HTTP_204_NO_CONTENT,
    responses=ErrorResponsesDict("unauthorized"),
)
async def remove_me_services(me: AuthorizedUser) -> None:
    await me.fetch_link(User.services)
    for service in me.services:
        await service.delete()
    me.services = []
    await me.save()


@router.delete("", status_code=status.HTTP_204_NO_CONTENT)
async def remove_many(pagination: PaginationQuery) -> None:
    await User.find_all(pagination.skip, pagination.limit).delete()


@router.get("/{user_id}/services/", responses=ErrorResponsesDict("not_found"))
async def read_one_services(user_id: PydanticObjectId) -> list[ServiceRead]:
    user = await User.get(user_id, fetch_links=True)
    if user is None:
        raise user_not_found
    return user.services


@router.patch(
    "/me/friends/{user_id}",
    responses=ErrorResponsesDict("unauthorized", "not_found", "conflict"),
)
async def edit_me_friends(me: AuthorizedUser, user_id: PydanticObjectId) -> User:
    if user_id == me.id:
        raise friend_request_yourself
    user = await User.get(user_id)
    if user is None:
        raise user_not_found

    me_f = me.friends_ids
    me_sent = me_f["sent"]
    me_active = me_f["active"]
    if user_id in me_active or user_id in me_sent:
        raise already_friend_or_request

    user_f = user.friends_ids

    if user_id in (me_received := me_f["received"]):
        me_received.remove(user_id)
        user_f["sent"].remove(me.id)
        me_active.append(user_id)
        user_f["active"].append(me.id)
    else:
        me_sent.append(user_id)
        user_f["received"].append(me.id)

    await me.save()
    await user.save()
    return me


@router.get("/me/friends/", responses=ErrorResponsesDict("unauthorized"))
async def read_me_friends(
    me: AuthorizedUser, friend_type: FriendType
) -> list[UserRead]:
    return [await User.get(user_id) for user_id in me.friends_ids[friend_type]]


@router.delete(
    "/me/friends/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    responses=ErrorResponsesDict("unauthorized", "not_found", "conflict"),
)
async def remove_me_friends(me: AuthorizedUser, user_id: PydanticObjectId) -> None:
    user = await User.get(user_id)
    if user is None:
        raise user_not_found
    me_f = me.friends_ids
    user_f = user.friends_ids

    if user_id in (active := me_f["active"]):
        active.remove(user_id)
        user_f["active"].remove(me.id)
    elif user_id in (sent := me_f["sent"]):
        sent.remove(user_id)
        user_f["received"].remove(me.id)
    elif user_id in (received := me_f["received"]):
        received.remove(user_id)
        user_f["sent"].remove(me.id)
    else:
        raise user_no_friend_or_request

    await me.save()
    await user.save()


@router.get("/{user_id}/friends/", responses=ErrorResponsesDict("not_found"))
async def read_one_friends(
    user_id: PydanticObjectId, friend_type: FriendType
) -> list[UserRead]:
    user = await User.get(user_id)
    if user is None:
        raise user_not_found

    return [await User.get(user_id) for user_id in user.friends_ids[friend_type]]

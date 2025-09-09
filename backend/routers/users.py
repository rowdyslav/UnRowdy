from beanie.odm.fields import PydanticObjectId
from fastapi import APIRouter, status

from core import (
    FASTAPI_USERS,
    AuthorizedUser,
    ErrorResponsesDict,
    PaginationQuery,
    User,
    UserFriends,
    UserRead,
    UserUpdate,
    Wish,
    WishCreate,
    friend_request_already_sent,
    friend_request_yourself,
    user_no_friend_or_request,
    user_not_found,
)

router = APIRouter(prefix="/users", tags=["Users"])
router.include_router(FASTAPI_USERS.get_users_router(UserRead, UserUpdate))


@router.get("")
async def read_many(pagination: PaginationQuery) -> list[User]:
    return await User.find_all(pagination.offset, pagination.limit).to_list()


@router.delete("", status_code=status.HTTP_204_NO_CONTENT)
async def remove_many(pagination: PaginationQuery) -> None:
    await User.find_all(pagination.offset, pagination.limit).delete()


@router.post("/me/wishes", status_code=status.HTTP_201_CREATED)
async def add_me_wishes(me: AuthorizedUser, wish_in: WishCreate) -> Wish:
    wish = Wish(user=me, **wish_in.model_dump(exclude_unset=True))
    return await wish.insert()


@router.get("/me/wishes", responses=ErrorResponsesDict("unauthorized"))
async def read_me_wishes(me: AuthorizedUser) -> list[Wish]:
    return await Wish.find(Wish.user.id == me.id).to_list()


@router.delete(
    "/me/wishes",
    status_code=status.HTTP_204_NO_CONTENT,
    responses=ErrorResponsesDict("unauthorized"),
)
async def remove_me_wishes(me: AuthorizedUser) -> None:
    await Wish.find(Wish.user_id == me.id).delete()


@router.get("/me/friends", responses=ErrorResponsesDict("unauthorized"))
async def read_me_friends(me: AuthorizedUser) -> list[UserRead]:
    return me.friends.active


@router.post(
    "/me/friends/{user_id}",
    responses=ErrorResponsesDict("unauthorized", "not_found", "conflict"),
)
async def create_me_friends(
    me: AuthorizedUser, user_id: PydanticObjectId
) -> UserFriends:
    if user_id == me.id:
        raise friend_request_yourself
    user = await User.get(user_id)
    if user is None:
        raise user_not_found
    sent = me.friends.sent
    if user_id in sent:
        raise friend_request_already_sent

    received = me.friends.received
    if user_id not in received:
        sent.append(user_id)
        user.friends.received.append(me.id)
    else:
        received.remove(user_id)
        me.friends.active.append(user_id)
        user.friends.active.append(me.id)
    await me.save()
    await user.save()
    return me.friend_requests


@router.delete(
    "/me/friends/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    responses=ErrorResponsesDict("unauthorized", "not_found", "conflict"),
)
async def remove_me_friends(me: AuthorizedUser, user_id: PydanticObjectId) -> None:
    user = await User.get(user_id)
    if user is None:
        raise user_not_found

    if user_id in (active := me.friends.active):
        active.remove(user_id)
        user.friends.active.remove(me.id)
    elif user_id in (sent := me.friends.sent):
        sent.remove(user_id)
        user.friends.received.remove(me.id)
    elif user_id in (received := me.friends.received):
        received.remove(user_id)
        user.friends.sent.remove(me.id)
    else:
        raise user_no_friend_or_request
    await me.save()
    await user.save()

from beanie.odm.fields import PydanticObjectId
from fastapi import APIRouter, status
from typing import Literal
from core import (
    FASTAPI_USERS,
    AuthorizedUser,
    ErrorResponsesDict,
    PaginationQuery,
    User,
    UserFriends,
    UserRead,bad_friends_type,
    UserUpdate,
    Wish,
    WishCreate,
    already_friend_or_request,
    friend_request_yourself,
    user_no_friend_or_request,
    user_not_found,
)

router = APIRouter(prefix="/users", tags=["Users"])
router.include_router(FASTAPI_USERS.get_users_router(UserRead, UserUpdate))


@router.get("")
async def read_many(pagination: PaginationQuery) -> list[UserRead]:
    users = await User.find_all(pagination.offset, pagination.limit).to_list()
    return [UserRead.model_validate(user) for user in users]


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
async def read_me_friends(me: AuthorizedUser, friends_type: Literal['active', 'sent', 'recieved']) -> list[UserRead]:
    get_users = lambda users_ids: [User.get(user_id) for user_id in users_ids]
    match friends_type:
        case "active":
            friends = get_users(me.friends_ids.active)
        case "sent":
            friends = get_users(me.friends_ids.sent)
        case "received":
            friends = get_users(me.friends_ids.received)
        case _:
            raise bad_friends_type
    return friends

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
    me_sent = me_f.sent
    me_active = me_f.active
    if user_id in me_active or user_id in me_sent:
        raise already_friend_or_request

    user_f = user.friends_ids
    me_received = me_f.received
    user_received = user_f.received

    if user_id not in me_received:
        me_sent.append(user_id)
        user_received.append(me.id)
    else:
        me_sent.remove(user_id)
        user_received.remove(user_id)
        me_active.append(user_id)
        user_f.active.append(me.id)

    await me.save()
    await user.save()
    return me


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

    if user_id in (active := me_f.active):
        active.remove(user_id)
        user_f.active.remove(me.id)
    elif user_id in (sent := me_f.sent):
        sent.remove(user_id)
        user_f.received.remove(me.id)
    elif user_id in (received := me_f.received):
        received.remove(user_id)
        user_f.sent.remove(me.id)
    else:
        raise user_no_friend_or_request

    await me.save()
    await user.save()

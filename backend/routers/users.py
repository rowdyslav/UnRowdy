from beanie.odm.fields import PydanticObjectId
from fastapi import APIRouter, status

from core import (
    FASTAPI_USERS,
    AuthorizedUser,
    ErrorResponsesDict,
    PaginationQuery,
    User,
    UserFriendRequests,
    UserRead,
    UserUpdate,
    Wish,
    WishCreate,
    user_friend_request_already_sent,
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
async def read_me_friends(me: AuthorizedUser) -> list[UserRead]:
    return me.friends


@router.get("/me/friend_requests", responses=ErrorResponsesDict("unauthorized"))
async def read_me_friend_requests(me: AuthorizedUser) -> UserFriendRequests:
    return me.friend_requests


@router.post(
    "/me/friend_requests/{user_id}", responses=ErrorResponsesDict("unauthorized")
)
async def create_me_friend_requests(
    me: AuthorizedUser, user_id: PydanticObjectId
) -> UserFriendRequests:
    if user_id in me.friend_requests.sent:
        raise user_friend_request_already_sent

    me.friend_requests.sent.append(user_id)
    await me.save()
    return me.friend_requests

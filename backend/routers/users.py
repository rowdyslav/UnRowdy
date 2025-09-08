from core import (
    AuthorizedUser,
    ErrorResponsesDict,
    PaginationQuery,
    UserFriendRequests,
    UserRead,
)
from fastapi import APIRouter, status
from models import User, Wish, user_friend_request_already_sent, user_not_found

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("")
async def read_many(pagination: PaginationQuery) -> list[UserRead]:
    return await UserRead.from_queryset(
        User.all().limit(pagination.limit).offset(pagination.offset)
    )


@router.delete("", status_code=status.HTTP_204_NO_CONTENT)
async def remove_many(pagination: PaginationQuery) -> None:
    await User.all().limit(pagination.limit).offset(pagination.offset).delete()


@router.get("/{user_id}", responses=ErrorResponsesDict("not_found"))
async def read_one(user_id: int) -> UserRead:
    user = await User.get_or_none(id=user_id)
    if user is None:
        raise user_not_found
    return await UserRead.from_tortoise_orm(user)


@router.delete(
    "/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    responses=ErrorResponsesDict("not_found"),
)
async def remove_one(user_id: int) -> None:
    user = await User.get_or_none(id=user_id)
    if user is None:
        raise user_not_found
    await user.delete()


@router.get("/me", responses=ErrorResponsesDict("unauthorized"))
async def read_me(me: AuthorizedUser) -> UserRead:
    return me


@router.delete(
    "/me",
    status_code=status.HTTP_204_NO_CONTENT,
    responses=ErrorResponsesDict("unauthorized"),
)
async def remove_me(me: AuthorizedUser) -> None:
    await me.delete()


@router.post("/me/wishes", status_code=status.HTTP_201_CREATED)
async def add_me_wishes(me: AuthorizedUser, wish_in: Wish) -> Wish:
    return await Wish.from_tortoise_orm(
        await Wish.create(**wish_in.model_dump(exclude_unset=True), user_id=me.id)
    )


@router.get("/me/wishes", responses=ErrorResponsesDict("unauthorized"))
async def read_me_wishes(me: AuthorizedUser) -> list[Wish]:
    return await Wish.from_queryset(Wish.filter(user_id=me.id))


@router.delete(
    "/me/wishes",
    status_code=status.HTTP_204_NO_CONTENT,
    responses=ErrorResponsesDict("unauthorized"),
)
async def remove_me_wishes(me: AuthorizedUser) -> None:
    await Wish.filter(user_id=me.id).delete()


@router.get("/me/friends", responses=ErrorResponsesDict("unauthorized"))
async def read_me_friends(me: AuthorizedUser) -> list[UserRead]:
    return me.friends


@router.get("/me/friend_requests", responses=ErrorResponsesDict("unauthorized"))
async def read_me_friend_requests(me: AuthorizedUser) -> UserFriendRequests:
    return me.friend_requests


@router.post(
    "/me/friend_requests/{user_id}", responses=ErrorResponsesDict("unauthorized")
)
async def add_me_friend_requests(
    me: AuthorizedUser, user_id: int
) -> UserFriendRequests:
    if user_id in me.friend_requests.sent:
        raise user_friend_request_already_sent

    me.friend_requests.sent.append(user_id)
    await me.save()
    return me.friend_requests

from core import ErrorResponsesDict, QueryParamsDep, UserDep, UserSchema
from fastapi import APIRouter, status
from models import User, user_not_found

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("")
async def read_many(params: QueryParamsDep) -> list[UserSchema]:
    return await UserSchema.from_queryset(
        User.all().limit(params.limit).offset(params.offset)
    )


@router.delete(
    "",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def remove_many(params: QueryParamsDep) -> None:
    await User.all().limit(params.limit).offset(params.offset).delete()


@router.get("/me", responses=ErrorResponsesDict("unauthorized"))
async def read_me(user: UserDep) -> UserSchema:
    return user


@router.delete(
    "/me",
    status_code=status.HTTP_204_NO_CONTENT,
    responses=ErrorResponsesDict("unauthorized"),
)
async def remove_me(user: UserDep) -> None:
    await user.delete()


@router.get("/{user_id}", responses=ErrorResponsesDict("not_found"))
async def read_one(user_id: int) -> UserSchema:
    user = await User.get_or_none(id=user_id)
    if user is None:
        raise user_not_found
    return await UserSchema.from_tortoise_orm(user)


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

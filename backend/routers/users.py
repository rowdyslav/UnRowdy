from typing import Annotated

from fastapi import APIRouter, Depends, status
from pydantic import NonNegativeInt

from core import ErrorResponsesDict, UserSchema, login_manager
from models import User, user_not_found

router = APIRouter(prefix="/users", tags=["Users"])


@router.get('', response_model=list[UserSchema])
async def read_many(limit: NonNegativeInt = 10, offset: NonNegativeInt = 0):
    return await UserSchema.from_queryset(User.all().limit(limit).offset(offset))


@router.delete(
    '',
    status_code=status.HTTP_204_NO_CONTENT,
)
async def remove_many(limit: NonNegativeInt = 10, offset: NonNegativeInt = 0):
    await User.all().limit(limit).offset(offset).delete()


@router.get(
    "/me", response_model=UserSchema, responses=ErrorResponsesDict("unauthorized")
)
async def read_me(user: Annotated[UserSchema, Depends(login_manager)]) -> UserSchema:
    return user


@router.delete(
    "/me",
    status_code=status.HTTP_204_NO_CONTENT,
    responses=ErrorResponsesDict("unauthorized"),
)
async def remove_me(user: Annotated[UserSchema, Depends(login_manager)]) -> None:
    await user.delete()


@router.get(
    "/{user_id}", response_model=UserSchema, responses=ErrorResponsesDict("not_found")
)
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
async def remove_one(user_id: int):
    user = await User.get_or_none(id=user_id)
    if user is None:
        raise user_not_found
    await user.delete()

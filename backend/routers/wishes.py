from typing import Annotated

from fastapi import APIRouter, Depends, status
from pydantic import NonNegativeInt

from models import Wish, wish_not_found
from utils import (
    ErrorResponsesDict,
    UserSchema,
    WishSchema,
    WishSchemaIn,
    login_manager,
)

router = APIRouter(prefix="/wishes", tags=["Wishes"])

@router.post('', response_model=WishSchema, status_code=status.HTTP_201_CREATED)
async def add(wish_in: WishSchemaIn):
    return await Wish.create(**wish_in.model_dump(exclude_unset=True))

@router.get('', response_model=list[WishSchema])
async def read_many(limit: NonNegativeInt = 10, offset: NonNegativeInt = 0):
    return await WishSchema.from_queryset(Wish.all().limit(limit).offset(offset))


@router.delete(
    '',
    status_code=status.HTTP_204_NO_CONTENT
)
async def remove_many(limit: NonNegativeInt = 10, offset: NonNegativeInt = 0):
    await Wish.all().limit(limit).offset(offset).delete()


@router.get(
    "/me", response_model=WishSchema, responses=ErrorResponsesDict("unauthorized")
)
async def read_me(user: Annotated[UserSchema, Depends(login_manager)]) -> WishSchema:
    return await WishSchema.from_queryset(user.wishes.all())


@router.delete(
    "/me",
    status_code=status.HTTP_204_NO_CONTENT,
    responses=ErrorResponsesDict("unauthorized"),
)
async def remove_me(user: Annotated[WishSchema, Depends(login_manager)]) -> None:
    await user.wishes.all().delete()


@router.get(
    "/{wish_id}", response_model=WishSchema, responses=ErrorResponsesDict("not_found")
)
async def read_one(wish_id: int) -> WishSchema:
    wish = await Wish.get_or_none(id=wish_id)
    if wish is None:
        raise wish_not_found
    return await WishSchema.from_tortoise_orm(wish)


@router.delete(
    "/{wish_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    responses=ErrorResponsesDict("not_found"),
)
async def remove_one(wish_id: int):
    wish = await Wish.get_or_none(id=wish_id)
    if wish is None:
        raise wish_not_found
    await wish.delete()

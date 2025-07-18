from typing import Annotated

from fastapi import APIRouter, Depends, status
from pydantic import NonNegativeInt

from core import (
    ErrorResponsesDict,
    UserSchema,
    WishSchema,
    WishSchemaPublic,
    login_manager,
)
from models import Wish, wish_not_found

router = APIRouter(prefix="/wishes", tags=["Wishes"])


@router.get(
    "",
    response_model=list[WishSchemaPublic],
)
async def read_many(
    limit: NonNegativeInt = 10, offset: NonNegativeInt = 0
) -> list[WishSchemaPublic]:
    return await WishSchemaPublic.from_queryset(Wish.all().limit(limit).offset(offset))


@router.delete(
    "",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def remove_many(limit: NonNegativeInt = 10, offset: NonNegativeInt = 0):
    await Wish.all().limit(limit).offset(offset).delete()


@router.post("/me", response_model=WishSchema, status_code=status.HTTP_201_CREATED)
async def add_me(
    user: Annotated[UserSchema, Depends(login_manager)], wish_in: WishSchemaPublic
):
    return await WishSchema.from_tortoise_orm(
        await Wish.create(**wish_in.model_dump(exclude_unset=True), user_id=user.id)
    )


@router.get(
    "/me",
    response_model=list[WishSchemaPublic],
    responses=ErrorResponsesDict("unauthorized"),
)
async def read_me(
    user: Annotated[UserSchema, Depends(login_manager)],
) -> list[WishSchemaPublic]:
    return await WishSchemaPublic.from_queryset(Wish.filter(user_id=user.id))


@router.delete(
    "/me",
    status_code=status.HTTP_204_NO_CONTENT,
    responses=ErrorResponsesDict("unauthorized"),
)
async def remove_me(user: Annotated[UserSchema, Depends(login_manager)]) -> None:
    await Wish.filter(user_id=user.id).delete()


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

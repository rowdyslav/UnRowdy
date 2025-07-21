from core import (
    ErrorResponsesDict,
    QueryParamsDep,
    UserDep,
    WishSchema,
    WishSchemaPublic,
)
from fastapi import APIRouter, status
from models import Wish, wish_not_found

router = APIRouter(prefix="/wishes", tags=["Wishes"])


@router.get("")
async def read_many(params: QueryParamsDep) -> list[WishSchemaPublic]:
    return await WishSchemaPublic.from_queryset(
        Wish.all().limit(params.limit).offset(params.offset)
    )


@router.delete(
    "",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def remove_many(params: QueryParamsDep) -> None:
    await Wish.all().limit(params.limit).offset(params.offset).delete()


@router.post("/me", status_code=status.HTTP_201_CREATED)
async def add_me(
    user: UserDep,
    wish_in: WishSchemaPublic,
) -> WishSchema:
    return await WishSchema.from_tortoise_orm(
        await Wish.create(**wish_in.model_dump(exclude_unset=True), user_id=user.id)
    )


@router.get(
    "/me",
    responses=ErrorResponsesDict("unauthorized"),
)
async def read_me(user: UserDep) -> list[WishSchemaPublic]:
    return await WishSchemaPublic.from_queryset(Wish.filter(user_id=user.id))


@router.delete(
    "/me",
    status_code=status.HTTP_204_NO_CONTENT,
    responses=ErrorResponsesDict("unauthorized"),
)
async def remove_me(user: UserDep) -> None:
    await Wish.filter(user_id=user.id).delete()


@router.get("/{wish_id}", responses=ErrorResponsesDict("not_found"))
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
async def remove_one(wish_id: int) -> None:
    wish = await Wish.get_or_none(id=wish_id)
    if wish is None:
        raise wish_not_found
    await wish.delete()

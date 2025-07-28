from core import (
    ErrorResponsesDict,
    PaginationQuery,
    WishSchemaPublic,
)
from fastapi import APIRouter, status
from models import Wish, wish_not_found

router = APIRouter(prefix="/wishes", tags=["Wishes"])


@router.get("")
async def read_many(params: PaginationQuery) -> list[WishSchemaPublic]:
    return await WishSchemaPublic.from_queryset(
        Wish.all().limit(params.limit).offset(params.offset)
    )


@router.delete("", status_code=status.HTTP_204_NO_CONTENT)
async def remove_many(params: PaginationQuery) -> None:
    await Wish.all().limit(params.limit).offset(params.offset).delete()


@router.get("/{wish_id}", responses=ErrorResponsesDict("not_found"))
async def read_one(wish_id: int) -> WishSchemaPublic:
    wish = await Wish.get_or_none(id=wish_id)
    if wish is None:
        raise wish_not_found
    return await WishSchemaPublic.from_tortoise_orm(wish)


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

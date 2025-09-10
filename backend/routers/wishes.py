from fastapi import APIRouter, status

from core import (
    ErrorResponsesDict,
    PaginationQuery,
    Wish,
    WishRead,
    wish_not_found,
)

router = APIRouter(prefix="/wishes", tags=["Wishes"])


@router.get("")
async def read_many(pagination: PaginationQuery) -> list[Wish]:
    wishes = await Wish.find_all(pagination.offset, pagination.limit).to_list()
    return [WishRead.model_validate(wish) for wish in wishes]


@router.delete("", status_code=status.HTTP_204_NO_CONTENT)
async def remove_many(pagination: PaginationQuery) -> None:
    await Wish.find_all(pagination.offset, pagination.limit).delete()


@router.get("/{wish_id}", responses=ErrorResponsesDict("not_found"))
async def read_one(wish_id: str) -> WishRead:
    wish = await Wish.get_or_none(id=wish_id)
    if wish is None:
        raise wish_not_found
    return WishRead.model_validate(wish)


@router.delete(
    "/{wish_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    responses=ErrorResponsesDict("not_found"),
)
async def remove_one(wish_id: str) -> None:
    wish = await Wish.get_or_none(id=wish_id)
    if wish is None:
        raise wish_not_found
    await wish.delete()

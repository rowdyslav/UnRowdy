from beanie import PydanticObjectId
from fastapi import APIRouter

from core import ServiceCategory

router = APIRouter(prefix="/services", tags=["Services"])


@router.get("/categories/")
async def read_service_categories() -> list[ServiceCategory]:
    return await ServiceCategory.find({"parent": None}).to_list()


@router.get("/categories/{category_id}")
async def read_service_category_subcategories(
    category_id: PydanticObjectId,
) -> list[ServiceCategory]:
    return await ServiceCategory.find(
        ServiceCategory.parent.id == category_id
    ).to_list()

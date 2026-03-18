from beanie import PydanticObjectId
from fastapi import APIRouter

from core import ServiceCategory, ServiceCategoryRead

router = APIRouter(prefix="/services", tags=["ServiceCategories"])


@router.get("/categories/")
async def read_many() -> list[ServiceCategoryRead]:
    return await ServiceCategory.find({"parent": None}).to_list()


@router.get("/categories/{category_id}")
async def read_one_subcategories(
    category_id: PydanticObjectId,
) -> list[ServiceCategoryRead]:
    return await ServiceCategory.find(
        ServiceCategory.parent.id == category_id, fetch_links=True
    ).to_list()

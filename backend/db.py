from beanie import init_beanie
from pymongo import AsyncMongoClient

from core import Service, ServiceCategory, TgUser, User
from env import ENV

client = AsyncMongoClient(ENV.mongo_url, uuidRepresentation="standard")
db = client[ENV.mongo_database_name]


class ServiceCategoriesSync:
    """Синхронизирует категории услуг в БД с деревом из env."""

    def __init__(self, expected_tree: dict[str, tuple[str, ...]]) -> None:
        self.expected_tree = expected_tree
        self.expected_roots = set(expected_tree)
        self.expected_children = {
            subcategory_name
            for subcategory_names in expected_tree.values()
            for subcategory_name in subcategory_names
        }
        self.parent_name_by_child_name = {
            subcategory_name: category_name
            for category_name, subcategory_names in expected_tree.items()
            for subcategory_name in subcategory_names
        }
        self.categories: list[ServiceCategory] = []
        self.categories_by_name: dict[str, ServiceCategory] = {}
        self.categories_by_id: dict[object, ServiceCategory] = {}

    @classmethod
    async def reconcile(cls, expected_tree: dict[str, tuple[str, ...]]) -> None:
        sync = cls(expected_tree)
        await sync.run()

    async def run(self) -> None:
        await self.ensure_root_categories()
        await self.refresh()
        strong_mismatch = self.has_strong_mismatch()

        await self.upsert_expected_subcategories()
        if not strong_mismatch:
            return

        await self.delete_safe_unexpected_categories()
        await self.upsert_expected_subcategories()

    async def refresh(self) -> None:
        self.categories = await ServiceCategory.find_all(fetch_links=True).to_list()
        self.categories_by_name = {
            category.name: category for category in self.categories
        }
        self.categories_by_id = {category.id: category for category in self.categories}

    async def ensure_root_categories(self) -> None:
        await self.refresh()
        for category_name in self.expected_roots:
            category = self.categories_by_name.get(category_name)
            if category is None:
                await ServiceCategory(name=category_name).insert()
                continue
            if category.parent is not None:
                category.parent = None
                await category.save()

    def has_strong_mismatch(self) -> bool:
        for category in self.categories:
            parent_id = getattr(category.parent, "id", None)
            if category.name in self.expected_roots and parent_id is not None:
                return True
            if category.name not in self.expected_children:
                continue
            expected_parent_name = self.parent_name_by_child_name[category.name]
            expected_parent = self.categories_by_name.get(expected_parent_name)
            if expected_parent is None or parent_id != expected_parent.id:
                return True
        return False

    async def upsert_expected_subcategories(self) -> None:
        await self.refresh()
        for category_name, subcategory_names in self.expected_tree.items():
            parent = self.categories_by_name[category_name]
            for subcategory_name in subcategory_names:
                subcategory = self.categories_by_name.get(subcategory_name)
                if subcategory is None:
                    await ServiceCategory(
                        name=subcategory_name,
                        parent=parent,
                    ).insert()
                    continue

                parent_id = getattr(subcategory.parent, "id", None)
                if parent_id != parent.id:
                    subcategory.parent = parent
                    await subcategory.save()

    async def delete_safe_unexpected_categories(self) -> None:
        await self.refresh()
        categories_to_delete: list[ServiceCategory] = []

        for category in self.categories:
            parent_id = getattr(category.parent, "id", None)
            parent = self.categories_by_id.get(parent_id) if parent_id else None

            if parent is None:
                if (
                    category.name in self.expected_roots
                    or category.name in self.expected_children
                ):
                    continue
                if await self.category_has_services(category):
                    continue
                categories_to_delete.append(category)
                continue

            if parent.name not in self.expected_tree:
                continue
            if category.name in self.expected_tree[parent.name]:
                continue
            if await self.category_has_services(category):
                continue
            categories_to_delete.append(category)

        for category in categories_to_delete:
            await category.delete()

    @staticmethod
    async def category_has_services(category: ServiceCategory) -> bool:
        return await Service.find_one(Service.category.id == category.id) is not None


async def init_db() -> None:
    await init_beanie(
        database=db, document_models=[User, Service, ServiceCategory, TgUser]
    )
    await ServiceCategoriesSync.reconcile(ENV.service_categories)

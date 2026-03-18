from collections.abc import Sequence
from typing import Annotated

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict


class EnvDataParser:
    """Парсит сложные значения из env в доменные структуры."""

    @staticmethod
    def split_items(value: str, separator: str) -> tuple[str, ...]:
        return tuple(item.strip() for item in value.split(separator) if item.strip())

    @classmethod
    def parse_csv(cls,value: str | Sequence[str]) -> tuple[str, ...]:

        if isinstance(value, str):
            result = cls.split_items(value, ",")
        elif isinstance(value, Sequence):
            result = tuple(str(item).strip() for item in value if str(item).strip())
        else:
            raise TypeError(_ := "CORS_ALLOW_ORIGINS должен быть непустым списком")

        if not result:
            raise ValueError(_)
        return result

    @classmethod
    def parse_service_categories(
        cls,
        value: str | Sequence[str],
    ) -> dict[str, tuple[str, ...]]:
        if isinstance(value, str):
            normalized_value = value.strip()
            if (
                not normalized_value.startswith("[")
                or not normalized_value.endswith("]")
            ):
                raise TypeError(
                    _ := (
                        "SERVICE_CATEGORIES должен быть в формате "
                        "[Категория>Подкатегория1,Подкатегория2;...]"
                    )
                )
            value = cls.split_items(normalized_value[1:-1], ";")
        if not isinstance(value, Sequence):
            raise TypeError(
                _ := (
                    "SERVICE_CATEGORIES должен быть в формате "
                    "[Категория>Подкатегория1,Подкатегория2;...]"
                )
            )

        category_tree: dict[str, tuple[str, ...]] = {}
        for raw_category in value:
            if not isinstance(raw_category, str):
                raise TypeError(
                    _ := (
                        "Категория должна быть в формате "
                        "Название>Подкатегория1,Подкатегория2"
                    )
                )

            category_name, separator, subcategories = raw_category.partition(">")
            normalized_name = category_name.strip()
            if not separator or not normalized_name:
                raise ValueError(
                    _ := (
                        "Категория должна быть в формате "
                        "Название>Подкатегория1,Подкатегория2"
                    )
                )

            category_tree[normalized_name] = cls.parse_csv(
                subcategories,
                error_message="Список подкатегорий не должен быть пустым",
            )

        if not category_tree:
            raise ValueError(_ := "SERVICE_CATEGORIES не должен быть пустым")
        return category_tree


class EnvSettings(BaseSettings):
    """Настройки backend, загружаемые из `.env`."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    mongo_url: str = Field(alias="MONGO_URL")
    mongo_database_name: str = Field(alias="MONGO_DATABASE_NAME")
    auth_secret: str = Field(alias="AUTH_SECRET")
    cors_allow_origins: Annotated[tuple[str, ...], NoDecode] = Field(
        alias="CORS_ALLOW_ORIGINS"
    )
    service_categories: Annotated[dict[str, tuple[str, ...]], NoDecode] = Field(
        alias="SERVICE_CATEGORIES"
    )

    @field_validator("cors_allow_origins", mode="before")
    @classmethod
    def parse_cors_allow_origins(
        cls,
        value: str | Sequence[str],
    ) -> tuple[str, ...]:
        return EnvDataParser.parse_csv(
            value
        )

    @field_validator("service_categories", mode="before")
    @classmethod
    def parse_service_categories(
        cls,
        value: str | Sequence[str],
    ) -> dict[str, tuple[str, ...]]:
        return EnvDataParser.parse_service_categories(value)


ENV = EnvSettings()

from __future__ import annotations

from typing import TYPE_CHECKING

from fastapi import HTTPException
from tortoise import Model
from tortoise.contrib.pydantic import pydantic_model_creator
from tortoise.fields import (
    CharField,
    DatetimeField,
    DecimalField,
    ForeignKeyField,
    ForeignKeyRelation,
    IntField,
    TextField,
)

wish_not_found = HTTPException(404, "Желание не найдено!")


class Wish(Model):
    from schemas import User

    id = IntField(primary_key=True)
    user: ForeignKeyRelation[User] = ForeignKeyField(
        "models.User", related_name="wishes"
    )
    name = CharField(max_length=20)
    price = DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
    )
    image_b64 = TextField(null=True)
    created_at = DatetimeField(auto_now_add=True)
    modified_at = DatetimeField(auto_now=True)

    class Meta:
        table = "wishes"

    class PydanticMeta:
        exclude = ["..."]


if TYPE_CHECKING:

    class WishSchema(Wish, PydanticModel):  # type:ignore[misc]
        pass

    class WishSchemaIn(Wish, PydanticModel):  # type:ignore[misc]
        pass

else:
    from icecream import ic
    ic('wish')
    WishSchema = pydantic_model_creator(Wish, name="Wish")
    WishSchemaIn = pydantic_model_creator(Wish, name="WishIn")

from __future__ import annotations

from fastapi import HTTPException
from tortoise import Model
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
    from models import User

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

    # class PydanticMeta:
    #     exclude = ["user"]


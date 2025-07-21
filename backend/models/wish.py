from fastapi import HTTPException
from tortoise.fields import (
    CharField,
    DecimalField,
    ForeignKeyField,
    ForeignKeyRelation,
    IntField,
    TextField,
)

from .utils import TortoiseBase

wish_not_found = HTTPException(404, "Желание не найдено!")


class Wish(TortoiseBase):
    """Модель желания пользователя"""

    from models import User

    id: int = IntField(primary_key=True)
    user: ForeignKeyRelation[User] = ForeignKeyField(
        "unrowdy.User", related_name="wishes"
    )
    name: str = CharField(max_length=20)
    price: float | None = DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
    )
    image_b64: str | None = TextField(null=True)

    class Meta:
        table = "wishes"

    class PydanticMeta:
        exclude = ["user_id"]

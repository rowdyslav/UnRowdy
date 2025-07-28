from datetime import datetime as dt
from typing import Literal

from pydantic import BaseModel
from tortoise import Model
from tortoise.fields import DatetimeField, IntField


class TortoiseBase(Model):
    """Базовая модель для Tortoise ORM"""

    id: int = IntField(primary_key=True)

    created_at: dt = DatetimeField(auto_now_add=True)
    modified_at: dt = DatetimeField(auto_now=True)

    class Meta:
        abstract = True


class BearerToken(BaseModel):
    """Модель для токена доступа"""

    access_token: str
    token_type: Literal["bearer"] = "bearer"

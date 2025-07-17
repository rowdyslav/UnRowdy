from typing import Literal

from pydantic import BaseModel


class BearerToken(BaseModel):
    access_token: str
    token_type: Literal["bearer"] = "bearer"

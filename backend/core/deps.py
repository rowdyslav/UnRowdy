from typing import Annotated

from fastapi import Depends

from .models import User
from .schemas import Pagination, ServiceFind, UserFind
from .user_manager import FASTAPI_USERS

AuthorizedUser = Annotated[User, Depends(FASTAPI_USERS.current_user())]
PaginationQuery = Annotated[Pagination, Depends()]
UserQuery = Annotated[UserFind, Depends()]
ServiceQuery = Annotated[ServiceFind, Depends()]

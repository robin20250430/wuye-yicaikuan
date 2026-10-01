from datetime import datetime, timezone
from pydantic import BaseModel, Field

from .schemas.common import UserCreateRequest, UserLoginRequest, UserProfile

router_users = []


class ListUserResponse(BaseModel):
    total: int
    users: list[UserProfile]


def register_user(email: str, password: str, company_name: str | None = None) -> UserProfile:
    pass


def login_user(email: str, password: str) -> UserProfile:
    pass

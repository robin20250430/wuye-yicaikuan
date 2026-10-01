from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from ..schemas.common import UserCreateRequest, UserLoginRequest, UserProfile

router = APIRouter()

USERS: dict[str, dict] = {}


class ListUserResponse(BaseModel):
    total: int
    users: list[UserProfile]


@router.get("/profile", response_model=UserProfile)
def get_profile(email: str) -> UserProfile:
    user = USERS.get(email)
    if user is None:
        raise HTTPException(status_code=404, detail="用户不存在")
    return UserProfile(**user)


@router.get("/", response_model=ListUserResponse)
def list_users() -> ListUserResponse:
    items = [UserProfile(**user) for user in USERS.values()]
    return ListUserResponse(total=len(items), users=items)

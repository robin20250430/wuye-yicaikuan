from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from ...schemas.common import UserCreateRequest, UserLoginRequest, UserProfile

router = APIRouter()

USERS: dict[str, dict] = {}


@router.post("/register", response_model=UserProfile)
def register(payload: UserCreateRequest) -> UserProfile:
    if payload.email in USERS:
        raise HTTPException(status_code=400, detail="用户已存在")
    user_id = f"user_{uuid4().hex[:8]}"
    user = {
        "id": user_id,
        "email": payload.email,
        "company_name": payload.company_name,
        "role": "user",
        "created_at": datetime.now(timezone.utc),
    }
    USERS[payload.email] = user
    return UserProfile(**user)


@router.post("/login", response_model=UserProfile)
def login(payload: UserLoginRequest) -> UserProfile:
    user = USERS.get(payload.email)
    if not user or payload.password != "demo-password":
        raise HTTPException(status_code=401, detail="用户名或密码错误")
    return UserProfile(**user)

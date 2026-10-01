from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException
from sqlalchemy import select
import jwt

from ...config import settings
from ...db.database import SessionLocal, UserORM, hash_password, verify_password
from ...schemas.common import AuthResponse, UserCreateRequest, UserLoginRequest, UserProfile

router = APIRouter()


def issue_token(user: UserORM) -> str:
    return jwt.encode({"sub": user.id, "email": user.email, "exp": datetime.now(timezone.utc).timestamp() + settings.jwt_expire_minutes * 60}, settings.jwt_secret, algorithm="HS256")


def profile(user: UserORM) -> UserProfile:
    return UserProfile(id=user.id, email=user.email, company_name=user.company_name, role=user.role, created_at=user.created_at)


@router.post("/register", response_model=AuthResponse)
def register(payload: UserCreateRequest) -> AuthResponse:
    with SessionLocal() as db:
        if db.scalar(select(UserORM).where(UserORM.email == payload.email)):
            raise HTTPException(status_code=400, detail="用户已存在")
        user = UserORM(id=f"user_{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S%f')}", email=payload.email, password_hash=hash_password(payload.password), company_name=payload.company_name)
        db.add(user)
        db.commit()
        db.refresh(user)
        return AuthResponse(access_token=issue_token(user), user=profile(user))


@router.post("/login", response_model=AuthResponse)
def login(payload: UserLoginRequest) -> AuthResponse:
    with SessionLocal() as db:
        user = db.scalar(select(UserORM).where(UserORM.email == payload.email))
        if not user or not verify_password(payload.password, user.password_hash):
            raise HTTPException(status_code=401, detail="用户名或密码错误")
        return AuthResponse(access_token=issue_token(user), user=profile(user))


@router.get("/profile", response_model=UserProfile)
def get_profile(email: str) -> UserProfile:
    with SessionLocal() as db:
        user = db.scalar(select(UserORM).where(UserORM.email == email))
        if not user:
            raise HTTPException(status_code=404, detail="用户不存在")
        return profile(user)

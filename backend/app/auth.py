from datetime import datetime, timezone
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import jwt
from ...schemas.common import UserProfile
from ...config import settings

def get_current_user(authorization: str = None) -> UserProfile | None:
    if not authorization:
        return None
    try:
        scheme, token = authorization.split(" ")
        if scheme.lower() != "bearer":
            return None
        payload = jwt.decode(token, settings.jwt_secret, algorithms=["HS256"])
        return UserProfile(
            id=payload.get("sub"),
            email=payload.get("email"),
            role="user",
            created_at=datetime.now(timezone.utc),
        )
    except (ValueError, jwt.DecodeError, jwt.ExpiredSignatureError):
        return None

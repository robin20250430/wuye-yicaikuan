from contextlib import asynccontextmanager
from datetime import datetime, timezone
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routes.auth import router as auth_router
from .api.routes.documents import router as documents_router
from .api.routes.calculator import router as calculator_router
from .api.routes.articles import router as articles_router
from .api.routes.enterprise import router as enterprise_router
from .api.routes.orders import router as orders_router
from .api.routes.payments import router as payments_router
from .api.routes.lawyers import router as lawyers_router
from .api.routes.dashboard import router as dashboard_router
from .config import settings
from .db.database import init_db
from .db.migrations import upgrade
from .schemas.common import HealthResponse

@asynccontextmanager
async def lifespan(_: FastAPI):
    init_db()
    upgrade()
    yield

app = FastAPI(title="物业易催款 API", version="1.1.0", description="物业费催缴文书生成与企业管理 API", lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=settings.allowed_origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(documents_router, prefix="/api/documents", tags=["documents"])
app.include_router(calculator_router, prefix="/api/calculator", tags=["calculator"])
app.include_router(articles_router, prefix="/api/articles", tags=["articles"])
app.include_router(enterprise_router, prefix="/api/enterprise", tags=["enterprise"])
app.include_router(orders_router, prefix="/api/orders", tags=["orders"])
app.include_router(payments_router, prefix="/api/payments", tags=["payments"])
app.include_router(lawyers_router, prefix="/api/lawyers", tags=["lawyers"])
app.include_router(dashboard_router, prefix="/api/dashboard", tags=["dashboard"])

@app.get("/api/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(status="ok", timestamp=datetime.now(timezone.utc))

from datetime import datetime, timezone
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routes.documents import router as documents_router
from .schemas.common import HealthResponse
from .config import settings

app = FastAPI(
    title="物业易催款 API",
    version="0.1.0",
    description="物业费催缴文书生成 MVP API",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(documents_router, prefix="/api/documents", tags=["documents"])

@app.get("/api/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(status="ok", timestamp=datetime.now(timezone.utc))

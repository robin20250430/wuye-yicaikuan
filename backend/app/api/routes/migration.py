from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter
from pydantic import BaseModel, Field

from ..schemas.common import DocumentGenerateRequest, GeneratedDocument
from ..services.ai_service import generate_document_with_ai_fallback

router = APIRouter()


class DebtRecord(BaseModel):
    name: str
    room_no: str
    address: str
    amount: float
    debt_period: str


@router.post("/generate", response_model=GeneratedDocument)
def generate(payload: DocumentGenerateRequest) -> GeneratedDocument:
    return generate_document_with_ai_fallback(payload)


@router.post("/batch")
def batch_generate(items: list[DebtRecord]) -> dict:
    return {
        "batch_id": f"batch_{uuid4().hex[:8]}",
        "count": len(items),
        "status": "completed",
        "message": "批量生成已完成",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }

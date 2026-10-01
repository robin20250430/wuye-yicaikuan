from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter
from pydantic import BaseModel, Field

from ..schemas.common import DocumentGenerateRequest, GeneratedDocument
from ..services.ai_service import generate_document_with_ai_fallback

router = APIRouter()


@router.post("/generate", response_model=GeneratedDocument)
def create_document(payload: DocumentGenerateRequest) -> GeneratedDocument:
    return generate_document_with_ai_fallback(payload)


@router.get("/templates")
def get_templates() -> list[dict]:
    return [
        {"id": "notice", "title": "物业费催缴通知书", "category": "通知函", "description": "用于提醒业主按时缴纳物业费", "price": "免费"},
        {"id": "deadline_notice", "title": "限期缴费通知书", "category": "通知函", "description": "用于明确缴费期限和后续措施", "price": "免费"},
        {"id": "lawyer_letter", "title": "律师函模板", "category": "律师函", "description": "适合发出专业律师函", "price": "29.9"},
        {"id": "litigation_notice", "title": "起诉前告知书", "category": "诉讼材料", "description": "用于诉前告知和风险提示", "price": "199"},
    ]


class BatchUploadRequest(BaseModel):
    file_name: str = Field(..., min_length=1)
    rows: list[dict] = Field(default_factory=list)


@router.post("/batch-upload")
def upload_batch(rows: BatchUploadRequest) -> dict:
    generated_count = len(rows.rows)
    return {
        "batch_id": str(uuid4()),
        "file_name": rows.file_name,
        "total_rows": generated_count,
        "generated_count": generated_count,
        "status": "uploaded",
        "message": "文件已接收，进入批量生成队列。",
    }

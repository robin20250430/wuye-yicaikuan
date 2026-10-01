from datetime import datetime, timezone
from typing import Any

from fastapi import APIRouter

from ..schemas.common import DocumentGenerateRequest, GeneratedDocument
from ..services.document_service import generate_document

router = APIRouter()


def generate_document_with_ai_fallback(payload: DocumentGenerateRequest) -> GeneratedDocument:
    doc = generate_document(payload)
    if payload.document_type == "notice":
        doc.content = doc.content + "\n\nAI补充说明：根据欠费金额及时间，建议在发函前核对欠费项、物业服务合同及此前的催缴记录。"
    return doc

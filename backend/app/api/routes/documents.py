from fastapi import APIRouter
from ..services.document_service import generate_document
from ..schemas.common import DocumentGenerateRequest, GeneratedDocument

router = APIRouter()

@router.post("/generate", response_model=GeneratedDocument)
def create_document(payload: DocumentGenerateRequest) -> GeneratedDocument:
    return generate_document(payload)

@router.get("/templates")
def list_templates():
    return [
        {"id": "notice", "title": "物业费催缴通知书", "category": "通知函", "description": "用于通知业主尽快缴纳物业费。", "price": "免费"},
        {"id": "deadline_notice", "title": "限期缴费通知书", "category": "通知函", "description": "用于规定较明确的付款期限。", "price": "免费"},
        {"id": "lawyer_letter", "title": "律师函（草稿）", "category": "律师函", "description": "适合转由律师确认、发送。", "price": "29.9"},
    ]

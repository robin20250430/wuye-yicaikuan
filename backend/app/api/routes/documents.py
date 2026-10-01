from fastapi import APIRouter
from ..schemas.common import DocumentGenerateRequest, GeneratedDocument
from ..services.document_service import generate_document

router = APIRouter()

@router.post("/generate", response_model=GeneratedDocument)
def create_document(payload: DocumentGenerateRequest) -> GeneratedDocument:
    return generate_document(payload)

from fastapi import APIRouter
from ...schemas.common import EnterpriseBatchResponse

router = APIRouter()

@router.post("/upload", response_model=EnterpriseBatchResponse)
def upload_file() -> EnterpriseBatchResponse:
    return EnterpriseBatchResponse(
        batch_id="batch_202501",
        total_rows=120,
        generated_count=110,
        status="processed",
        message="上传成功，已进入批量生成队列。",
    )

@router.post("/generate-batch", response_model=EnterpriseBatchResponse)
def generate_batch() -> EnterpriseBatchResponse:
    return EnterpriseBatchResponse(
        batch_id="batch_202501",
        total_rows=120,
        generated_count=120,
        status="completed",
        message="已完成批量生成。",
    )

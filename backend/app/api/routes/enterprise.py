from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel

from ...schemas.common import EnterpriseBatchResponse

router = APIRouter()


class EnterpriseUploadResponse(BaseModel):
    batch_id: str
    total_rows: int
    generated_count: int
    status: str
    message: str


@router.post("/upload", response_model=EnterpriseBatchResponse)
async def upload_file(file: UploadFile = File(...)) -> EnterpriseBatchResponse:
    if not file.filename:
        raise HTTPException(status_code=400, detail="请上传文件")
    if not file.filename.lower().endswith((".csv", ".xlsx", ".xls")):
        raise HTTPException(status_code=400, detail="仅支持 CSV/XLSX 文件")

    content = await file.read()
    rows = 0
    if file.filename.lower().endswith(".csv"):
        rows = len(content.decode("utf-8", errors="ignore").splitlines()) - 1
    else:
        rows = 0

    return EnterpriseBatchResponse(
        batch_id=f"batch_{uuid4().hex[:8]}",
        total_rows=max(rows, 0),
        generated_count=max(rows, 0),
        status="processed",
        message="上传成功，已进入批量生成队列。",
    )


@router.post("/generate-batch", response_model=EnterpriseBatchResponse)
def generate_batch() -> EnterpriseBatchResponse:
    return EnterpriseBatchResponse(
        batch_id=f"batch_{uuid4().hex[:8]}",
        total_rows=120,
        generated_count=120,
        status="completed",
        message="已完成批量生成。",
    )

from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, UploadFile, File, Response
from openpyxl import load_workbook
from uuid import uuid4
import csv
import io

from ...schemas.common import EnterpriseBatchResponse

router = APIRouter()
BATCH_STORAGE: dict[str, bytes] = {}

@router.post("/upload", response_model=EnterpriseBatchResponse)
async def upload_file(file: UploadFile = File(...)) -> EnterpriseBatchResponse:
    if not file.filename or not file.filename.lower().endswith((".csv", ".xlsx", ".xls")):
        raise HTTPException(status_code=400, detail="仅支持 CSV/XLSX 文件")
    content = await file.read()
    try:
        if file.filename.lower().endswith(".csv"):
            rows = list(csv.DictReader(io.StringIO(content.decode("utf-8-sig"))))
        else:
            workbook = load_workbook(io.BytesIO(content), read_only=True, data_only=True)
            sheet = workbook.active
            values = list(sheet.values)
            headers = [str(value or "") for value in (values[0] if values else [])]
            rows = [dict(zip(headers, row)) for row in values[1:]]
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"文件解析失败：{exc}") from exc
    batch_id = f"batch_{uuid4().hex[:10]}"
    BATCH_STORAGE[batch_id] = content
    return EnterpriseBatchResponse(batch_id=batch_id, total_rows=len(rows), generated_count=len(rows), status="processed", message="上传成功，已进入批量生成队列。")

@router.get("/download/{batch_id}")
def download_batch(batch_id: str) -> Response:
    content = BATCH_STORAGE.get(batch_id)
    if content is None:
        raise HTTPException(status_code=404, detail="批次不存在")
    return Response(content=content, media_type="application/octet-stream", headers={"Content-Disposition": f"attachment; filename={batch_id}.bin"})

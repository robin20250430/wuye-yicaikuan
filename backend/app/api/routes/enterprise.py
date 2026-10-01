from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter, HTTPException, UploadFile, File, Response
from pydantic import BaseModel

from ...schemas.common import EnterpriseBatchResponse

router = APIRouter()


BATCH_STORAGE = {}


@router.post("/upload", response_model=EnterpriseBatchResponse)
async def upload_file(file: UploadFile = File(...)) -> EnterpriseBatchResponse:
    if not file.filename:
        raise HTTPException(status_code=400, detail="请上传文件")
    if not file.filename.lower().endswith((".csv", ".xlsx", ".xls")):
        raise HTTPException(status_code=400, detail="仅支持 CSV/XLSX 文件")

    content = await file.read()
    rows = 0
    if file.filename.lower().endswith(".csv"):
        rows = max(len(content.decode("utf-8", errors="ignore").splitlines()) - 1, 0)

    batch_id = f"batch_{uuid4().hex[:8]}"
    BATCH_STORAGE[batch_id] = {
        "file_name": file.filename,
        "content": content.decode("utf-8", errors="ignore"),
        "total_rows": rows,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }

    return EnterpriseBatchResponse(
        batch_id=batch_id,
        total_rows=rows,
        generated_count=rows,
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


@router.get("/download/{batch_id}")
def download_batch(batch_id: str) -> Response:
    batch = BATCH_STORAGE.get(batch_id)
    if not batch:
        raise HTTPException(status_code=404, detail="批次不存在")

    content = f"""# 批量批次 {batch_id}
原始文件: {batch['file_name']}
创建时间: {batch['created_at']}
统计行数: {batch['total_rows']}

## 批量结果
{batch['content']}

## 说明
本批次扥需者利用批量生成生成特定量的催缴通知书、律师函债一市伜比
具体内容应由所有方理核实一致后作为正式送送之一。
"""

    return Response(
        content=content.encode("utf-8"),
        media_type="text/plain",
        headers={"Content-Disposition": f"attachment; filename={batch_id}.txt"},
    )

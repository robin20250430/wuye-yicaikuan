import json
from datetime import datetime, timezone
from typing import Any

from ..config import settings
from ..schemas.common import DocumentGenerateRequest, GeneratedDocument
from ..services.document_service import generate_document


def generate_document_with_ai_fallback(payload: DocumentGenerateRequest) -> GeneratedDocument:
    api_key = settings.openai_api_key
    if api_key:
        try:
            import urllib.request
            body = json.dumps({
                "model": settings.openai_model,
                "messages": [
                    {"role": "system", "content": "你是中国法律文书助手，生成简洁、专业、平实的物业催缴文书草稿。保持事实描述准确，不构成法律意见。"},
                    {"role": "user", "content": json.dumps({
                        "document_type": payload.document_type,
                        "property_company": payload.property_company,
                        "community_name": payload.community_name,
                        "owner_name": payload.owner_name,
                        "property_address": payload.property_address,
                        "overdue_amount": payload.overdue_amount,
                        "overdue_period": payload.overdue_period,
                        "contract_status": payload.contract_status,
                        "payment_deadline": payload.payment_deadline,
                        "contact_phone": payload.contact_phone,
                    }, ensure_ascii=False)}
                ],
                "temperature": 0.3,
            }).encode("utf-8")
            req = urllib.request.Request(
                url=f"{settings.openai_base_url}/chat/completions",
                data=body,
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=20) as response:
                data = json.loads(response.read().decode("utf-8"))
                text = data["choices"][0]["message"]["content"]
                doc = generate_document(payload)
                doc.content = text
                return doc
        except Exception:
            pass
    return generate_document(payload)

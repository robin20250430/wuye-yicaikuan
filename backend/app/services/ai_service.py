from datetime import datetime, timezone
from typing import Any

from fastapi import APIRouter

from ..schemas.common import DocumentGenerateRequest, GeneratedDocument

router = APIRouter()


def fallback_generate_document(payload: DocumentGenerateRequest) -> GeneratedDocument:
    title_map = {
        "notice": "物业费催缴通知书",
        "deadline_notice": "限期缴费通知书",
        "lawyer_letter": "物业费催缴律师函（草稿）",
        "litigation_notice": "起诉前告知书（草稿）",
    }
    content = f"""{title_map[payload.document_type]}

致：{payload.owner_name}
物业公司：{payload.property_company}
小区名称：{payload.community_name}
房屋地址：{payload.property_address}

现根据您提供的信息，贵方于 {payload.overdue_period} 期间在本项目产生物业服务费欠费情况，欠费金额合计为人民币 {payload.overdue_amount:.2f} 元。请贵方于 {payload.payment_deadline or '收到本通知后七日内'} 内完成支付，避免进一步影响双方权利义务。

特此通知：
1. 本通知仅用于提醒与事实核验；
2. 具体法律后果及违约责任，以合同约定、相关法律规定及后续沟通为准；
3. 如对金额或事实存在异议，请立即联系物业公司进行说明并提供相关证据材料。

物业公司名称：{payload.property_company}
项目名称：{payload.community_name}
联系方式：{payload.contact_phone or '请联系物业服务中心'}
通知日期：{datetime.now(timezone.utc).date().isoformat()}
"""
    return GeneratedDocument(
        id=f"doc_{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')}",
        document_type=payload.document_type,
        title=title_map[payload.document_type],
        content=content,
        disclaimer="本内容由系统根据用户填写信息生成，仅供文书草拟和信息整理参考，不构成法律意见，也不保证特定法律效果。正式使用前请核验事实、合同及当地法规，必要时咨询执业律师。",
        created_at=datetime.now(timezone.utc),
    )

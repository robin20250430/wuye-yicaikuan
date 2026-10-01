from datetime import datetime, timezone
from uuid import uuid4

from ..schemas.common import CalculatorRequest, CalculatorResponse, DocumentGenerateRequest, GeneratedDocument

TITLES = {
    "notice": "物业费催缴通知书",
    "deadline_notice": "限期缴费通知书",
    "lawyer_letter": "物业费催缴律师函（草稿）",
    "litigation_notice": "起诉前告知书（草稿）",
}

DISCLAIMER = "本内容由系统根据用户填写信息生成，仅供文书草拟和信息整理参考，不构成法律意见，也不保证特定法律效果。正式使用前请核验事实、合同及当地法规，必要时咨询执业律师。"


def generate_document(payload: DocumentGenerateRequest) -> GeneratedDocument:
    title = TITLES[payload.document_type]
    deadline = payload.payment_deadline or "收到本通知之日起七日内"
    phone = payload.contact_phone or "请联系物业服务中心"
    content = f"""{title}

致：{payload.owner_name}
物业公司：{payload.property_company}
小区名称：{payload.community_name}
房屋地址：{payload.property_address}

经核查，贵方于 {payload.overdue_period} 期间在 {payload.community_name} 项目产生物业费欠费情况，欠费金额合计人民币 {payload.overdue_amount:.2f} 元。请贵方于 {deadline} 前完成支付，并妥善保存付款凭证。

如对欠费金额、欠费时间或服务事项存在异议，请在收到本通知后尽快联系物业公司并提供相关证明材料，以便双方协商解决。如逾期未支付，且未达成解决方案，物业公司将按合同及适用法律规定，依法依约采取进一步措施。

物业公司名称：{payload.property_company}
项目名称：{payload.community_name}
联系电话：{phone}
通知日期：{datetime.now(timezone.utc).date().isoformat()}
"""
    return GeneratedDocument(
        id=str(uuid4()),
        document_type=payload.document_type,
        title=title,
        content=content,
        disclaimer=DISCLAIMER,
        created_at=datetime.now(timezone.utc),
    )


def calculate_debt(payload: CalculatorRequest) -> CalculatorResponse:
    principal = payload.monthly_fee * payload.overdue_months
    late_fee = principal * payload.late_fee_rate
    total = principal + late_fee
    return CalculatorResponse(
        principal=round(principal, 2),
        late_fee=round(late_fee, 2),
        total_amount=round(total, 2),
        overdue_days=payload.overdue_days,
        note="本计算仅用于快速预估，具体金额以合同约定及实际结算结果为准。",
    )

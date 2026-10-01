from datetime import datetime, timezone
from uuid import uuid4
from ..schemas.common import DocumentGenerateRequest, GeneratedDocument

TITLES = {
    "notice": "物业费催缴通知书",
    "deadline_notice": "限期缴费通知书",
    "lawyer_letter": "物业费催缴律师函（草稿）",
    "litigation_notice": "起诉前告知书（草稿）",
}

DISCLAIMER = "本内容由系统根据用户填写信息生成，仅供文书草拟和信息整理参考，不构成法律意见，也不保证特定法律效果。正式使用前请核验事实、合同及当地法律规定，必要时咨询执业律师。"

def generate_document(payload: DocumentGenerateRequest) -> GeneratedDocument:
    title = TITLES[payload.document_type]
    deadline = payload.payment_deadline or "收到本通知之日起七日内"
    phone = payload.contact_phone or "请联系物业服务中心"
    content = f"""{title}

致：{payload.owner_name}（{payload.property_address}）

贵方与我司之间的物业服务关系为：{payload.contract_status}。截至目前，贵方在{payload.community_name}项目产生的物业服务费尚有{payload.overdue_period}未支付，暂计欠费金额为人民币{payload.overdue_amount:.2f}元。

请贵方于{deadline}前完成支付，并妥善保存付款凭证。如对欠费金额或服务事项存在异议，请在收到本通知后及时与我司联系并提供相关材料，以便双方核对处理。

逾期未支付且未与我司达成解决方案的，我司将根据合同约定及适用法律，依法采取进一步措施，由此产生的相关费用和法律后果将按照法律规定及合同约定处理。

物业公司：{payload.property_company}
项目名称：{payload.community_name}
联系电话：{phone}
日期：{datetime.now(timezone.utc).date().isoformat()}
"""
    return GeneratedDocument(
        id=str(uuid4()), document_type=payload.document_type, title=title,
        content=content, disclaimer=DISCLAIMER,
        created_at=datetime.now(timezone.utc),
    )

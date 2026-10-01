from datetime import datetime, timezone
from fastapi import APIRouter
from ...schemas.common import LawyerProfile, LawyerListResponse

router = APIRouter()

LAWYERS = [
    LawyerProfile(
        id="lawyer_001",
        name="饶振宇",
        specialty="物业纠纷、债权追讨、诉前调解",
        experience_years=12,
        phone="138****8888",
        email="rao@example.com",
        office_address="深圳市南山区科技园路1号",
        bio="专业从事房地产、物业、债权追讨等领域法律服务，擅长诉前催收、律师函撰写与案件代理。累积办理1200+物业纠纷案件，成功率95%以上。",
        avatar_url="https://via.placeholder.com/200?text=Rao",
        success_rate=0.95,
        hourly_rate=500,
        total_cases=1200,
        created_at=datetime.now(timezone.utc),
    )
]

@router.get("/", response_model=LawyerListResponse)
def list_lawyers() -> LawyerListResponse:
    return LawyerListResponse(total=len(LAWYERS), lawyers=LAWYERS)

@router.get("/{lawyer_id}", response_model=LawyerProfile)
def get_lawyer(lawyer_id: str) -> LawyerProfile:
    for lawyer in LAWYERS:
        if lawyer.id == lawyer_id:
            return lawyer
    raise ValueError(f"律师不存在: {lawyer_id}")

@router.post("/contact")
def contact_lawyer(lawyer_id: str, message: str) -> dict:
    for lawyer in LAWYERS:
        if lawyer.id == lawyer_id:
            return {
                "status": "success",
                "message": f"已向 {lawyer.name} 律师发送咨询请求，预计2小时内回复。",
                "lawyer_name": lawyer.name,
                "lawyer_phone": lawyer.phone,
            }
    raise ValueError(f"律师不存在: {lawyer_id}")

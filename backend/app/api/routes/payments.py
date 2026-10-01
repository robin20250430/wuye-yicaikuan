from datetime import datetime, timezone

from fastapi import APIRouter
from pydantic import BaseModel

from ..schemas.common import PaymentResponse

router = APIRouter()


class PaymentRequest(BaseModel):
    order_id: str
    amount: float
    method: str = "online"


class PaymentResponse(BaseModel):
    payment_id: str
    order_id: str
    status: str
    amount: float
    method: str
    created_at: datetime


@router.post("/create")
def create_payment(payload: PaymentRequest) -> dict:
    return {
        "payment_id": f"pay_{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')}",
        "order_id": payload.order_id,
        "status": "pending",
        "amount": payload.amount,
        "method": payload.method,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }


@router.post("/confirm")
def confirm_payment() -> dict:
    return {"status": "completed", "message": "支付完成"}

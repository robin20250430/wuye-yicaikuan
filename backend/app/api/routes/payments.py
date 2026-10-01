from fastapi import APIRouter
from pydantic import BaseModel, Field

router = APIRouter()


class OrderCreateRequest(BaseModel):
    plan: str = Field(..., min_length=1)
    amount: float = Field(gt=0)
    user_id: str | None = None


@router.post("/create")
def create_order(payload: OrderCreateRequest) -> dict:
    return {
        "order_id": "order_demo_001",
        "plan": payload.plan,
        "amount": payload.amount,
        "status": "pending",
        "payment_url": "https://pay.example.com/demo",
    }

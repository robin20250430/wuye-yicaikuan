from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from ...schemas.common import OrderResponse

router = APIRouter()


class CreateOrderRequest(BaseModel):
    plan: str = Field(..., min_length=1)
    amount: float = Field(gt=0)
    user_id: str | None = None


@router.post("/create", response_model=OrderResponse)
def create_order(payload: CreateOrderRequest) -> OrderResponse:
    if payload.plan not in {"starter", "pro", "enterprise"}:
        raise HTTPException(status_code=400, detail="未知套餐")
    order_id = f"order_{uuid4().hex[:10]}"
    payment_url = f"https://pay.example.com/{order_id}"
    return OrderResponse(
        order_id=order_id,
        plan=payload.plan,
        amount=payload.amount,
        status="pending",
        payment_url=payment_url,
    )


@router.post("/confirm")
def confirm_order() -> dict:
    return {"status": "paid", "message": "支付成功"}

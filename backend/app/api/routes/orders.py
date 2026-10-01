from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.exc import NoResultFound
from ...config import settings
from ...db.database import SessionLocal, OrderORM
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
    with SessionLocal() as db:
        order = OrderORM(id=f"order_{__import__('uuid').uuid4().hex[:12]}", user_id=payload.user_id, plan=payload.plan, amount=payload.amount, provider="stripe" if settings.stripe_secret_key else "mock")
        db.add(order)
        db.commit()
        return OrderResponse(order_id=order.id, plan=order.plan, amount=order.amount, status=order.status, payment_url=f"/pay/{order.id}")

@router.post("/confirm")
def confirm_order(order_id: str) -> dict:
    with SessionLocal() as db:
        order = db.get(OrderORM, order_id)
        if not order:
            raise HTTPException(status_code=404, detail="订单不存在")
        order.status = "paid"
        db.commit()
        return {"order_id": order.id, "status": order.status, "message": "支付成功"}

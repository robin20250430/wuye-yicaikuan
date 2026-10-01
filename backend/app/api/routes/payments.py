from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from ...config import settings
from ...db.database import SessionLocal, OrderORM

router = APIRouter()

class PaymentRequest(BaseModel):
    order_id: str
    method: str = "mock"

@router.post("/create")
def create_payment(payload: PaymentRequest) -> dict:
    with SessionLocal() as db:
        order = db.get(OrderORM, payload.order_id)
        if not order:
            raise HTTPException(status_code=404, detail="订单不存在")
        if settings.stripe_secret_key and payload.method == "stripe":
            import stripe
            stripe.api_key = settings.stripe_secret_key
            session = stripe.checkout.Session.create(mode="payment", line_items=[{"price_data": {"currency": "cny", "product_data": {"name": f"物业易催款-{order.plan}"}, "unit_amount": round(order.amount * 100)}, "quantity": 1}], success_url=settings.payment_success_url, cancel_url=settings.payment_cancel_url, metadata={"order_id": order.id})
            order.provider = "stripe"
            order.provider_id = session.id
            db.commit()
            return {"payment_id": session.id, "status": "pending", "checkout_url": session.url}
        return {"payment_id": f"mock_{order.id}", "status": "pending", "checkout_url": f"/api/orders/confirm?order_id={order.id}"}

@router.post("/webhook/stripe")
def stripe_webhook(payload: dict) -> dict:
    order_id = payload.get("metadata", {}).get("order_id")
    if not order_id:
        return {"received": True}
    with SessionLocal() as db:
        order = db.get(OrderORM, order_id)
        if order:
            order.status = "paid"
            db.commit()
    return {"received": True}

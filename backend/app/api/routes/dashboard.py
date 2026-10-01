from datetime import datetime, timezone
from fastapi import APIRouter
from sqlalchemy import func, select
from ...db.database import SessionLocal, UserORM, OrderORM, DocumentORM
from ...schemas.common import DashboardStats, OrderListResponse, DocumentListResponse, OrderListItem, DocumentListItem, BatchTaskListResponse

router = APIRouter()

@router.get("/stats", response_model=DashboardStats)
def get_dashboard_stats() -> DashboardStats:
    with SessionLocal() as db:
        total_users = db.scalar(select(func.count(UserORM.id))) or 0
        total_orders = db.scalar(select(func.count(OrderORM.id))) or 0
        total_documents = db.scalar(select(func.count(DocumentORM.id))) or 0
        total_revenue = db.scalar(select(func.sum(OrderORM.amount)).where(OrderORM.status == "paid")) or 0.0
        this_month = datetime.now(timezone.utc).replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        month_revenue = db.scalar(select(func.sum(OrderORM.amount)).where(OrderORM.status == "paid", OrderORM.created_at >= this_month)) or 0.0
        month_docs = db.scalar(select(func.count(DocumentORM.id)).where(DocumentORM.created_at >= this_month)) or 0
        return DashboardStats(total_documents=total_documents, total_orders=total_orders, total_revenue=float(total_revenue), active_users=total_users, this_month_revenue=float(month_revenue), this_month_documents=month_docs)

@router.get("/orders", response_model=OrderListResponse)
def get_orders(user_id: str | None = None, skip: int = 0, limit: int = 20) -> OrderListResponse:
    with SessionLocal() as db:
        query = select(OrderORM).order_by(OrderORM.created_at.desc())
        if user_id:
            query = query.where(OrderORM.user_id == user_id)
        items = db.scalars(query.offset(skip).limit(limit)).all()
        total = db.scalar(select(func.count(OrderORM.id)).where(OrderORM.user_id == user_id)) if user_id else db.scalar(select(func.count(OrderORM.id)))
        return OrderListResponse(total=total or 0, items=[OrderListItem(id=x.id, plan=x.plan, amount=x.amount, status=x.status, created_at=x.created_at) for x in items])

@router.get("/documents", response_model=DocumentListResponse)
def get_documents(user_id: str | None = None, skip: int = 0, limit: int = 20) -> DocumentListResponse:
    with SessionLocal() as db:
        query = select(DocumentORM).order_by(DocumentORM.created_at.desc())
        if user_id:
            query = query.where(DocumentORM.user_id == user_id)
        items = db.scalars(query.offset(skip).limit(limit)).all()
        total = db.scalar(select(func.count(DocumentORM.id)).where(DocumentORM.user_id == user_id)) if user_id else db.scalar(select(func.count(DocumentORM.id)))
        return DocumentListResponse(total=total or 0, items=[DocumentListItem(id=x.id, document_type=x.document_type, title=x.title, owner_name=x.owner_name, property_address=x.property_address, overdue_amount=x.overdue_amount, status="completed", created_at=x.created_at) for x in items])

@router.get("/batch-tasks", response_model=BatchTaskListResponse)
def get_batch_tasks() -> BatchTaskListResponse:
    return BatchTaskListResponse(total=0, items=[])

from datetime import datetime, timezone
from fastapi import APIRouter
from sqlalchemy import func, select
from ...db.database import SessionLocal, UserORM, OrderORM, DocumentORM
from ...schemas.common import DashboardStats, OrderListResponse, DocumentListResponse, OrderListItem, DocumentListItem, BatchTaskListResponse, BatchTaskItem

router = APIRouter()

@router.get("/stats", response_model=DashboardStats)
def get_dashboard_stats() -> DashboardStats:
    with SessionLocal() as db:
        total_users = db.scalar(func.count(UserORM.id))
        total_orders = db.scalar(select(func.count(OrderORM.id)))
        total_documents = db.scalar(select(func.count(DocumentORM.id)))
        total_revenue = db.scalar(select(func.sum(OrderORM.amount)).where(OrderORM.status == "paid")) or 0.0
        
        this_month = datetime.now(timezone.utc).replace(day=1)
        month_revenue = db.scalar(
            select(func.sum(OrderORM.amount))
            .where(OrderORM.status == "paid")
            .where(OrderORM.created_at >= this_month)
        ) or 0.0
        month_docs = db.scalar(
            select(func.count(DocumentORM.id))
            .where(DocumentORM.created_at >= this_month)
        ) or 0
        
        return DashboardStats(
            total_documents=total_documents or 0,
            total_orders=total_orders or 0,
            total_revenue=float(total_revenue),
            active_users=total_users or 0,
            this_month_revenue=float(month_revenue),
            this_month_documents=month_docs or 0,
        )

@router.get("/orders", response_model=OrderListResponse)
def get_orders(user_id: str | None = None, skip: int = 0, limit: int = 20) -> OrderListResponse:
    with SessionLocal() as db:
        query = select(OrderORM).order_by(OrderORM.created_at.desc())
        if user_id:
            query = query.where(OrderORM.user_id == user_id)
        
        total = db.scalar(select(func.count(OrderORM.id)).select_from(query.subquery()))
        items = db.scalars(query.offset(skip).limit(limit)).all()
        
        return OrderListResponse(
            total=total or 0,
            items=[OrderListItem(
                id=item.id,
                plan=item.plan,
                amount=item.amount,
                status=item.status,
                created_at=item.created_at,
            ) for item in items]
        )

@router.get("/documents", response_model=DocumentListResponse)
def get_documents(user_id: str | None = None, skip: int = 0, limit: int = 20) -> DocumentListResponse:
    with SessionLocal() as db:
        query = select(DocumentORM).order_by(DocumentORM.created_at.desc())
        if user_id:
            query = query.where(DocumentORM.user_id == user_id)
        
        total = db.scalar(select(func.count(DocumentORM.id)).select_from(query.subquery()))
        items = db.scalars(query.offset(skip).limit(limit)).all()
        
        return DocumentListResponse(
            total=total or 0,
            items=[DocumentListItem(
                id=item.id,
                document_type=item.document_type,
                title=item.title,
                owner_name="",
                property_address="",
                overdue_amount=0.0,
                status="completed",
                created_at=item.created_at,
            ) for item in items]
        )

@router.get("/batch-tasks", response_model=BatchTaskListResponse)
def get_batch_tasks(user_id: str | None = None, skip: int = 0, limit: int = 20) -> BatchTaskListResponse:
    return BatchTaskListResponse(total=0, items=[])

from datetime import datetime, timezone

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

DATABASE_URL = "sqlite+aiosqlite:///./app.db"
engine = create_async_engine(DATABASE_URL, echo=False)


class Base(DeclarativeBase):
    pass


class UserORM(Base):
    __tablename__ = "users"
    id: Mapped[str] = mapped_column(primary_key=True, index=True)
    email: Mapped[str] = mapped_column(unique=True, index=True)
    company_name: Mapped[str | None]
    role: Mapped[str] = mapped_column(default="user")
    created_at: Mapped[datetime] = mapped_column(default=lambda: datetime.now(timezone.utc))


class OrderORM(Base):
    __tablename__ = "orders"
    id: Mapped[str] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[str | None] = mapped_column(index=True)
    plan: Mapped[str]
    amount: Mapped[float]
    status: Mapped[str] = mapped_column(default="pending")
    created_at: Mapped[datetime] = mapped_column(default=lambda: datetime.now(timezone.utc))


class DocumentORM(Base):
    __tablename__ = "documents"
    id: Mapped[str] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[str | None] = mapped_column(index=True)
    document_type: Mapped[str]
    title: Mapped[str]
    content: Mapped[str]
    disclaimer: Mapped[str]
    created_at: Mapped[datetime] = mapped_column(default=lambda: datetime.now(timezone.utc))


class DebtRecordORM(Base):
    __tablename__ = "debt_records"
    id: Mapped[str] = mapped_column(primary_key=True, index=True)
    batch_id: Mapped[str | None] = mapped_column(index=True)
    owner_name: Mapped[str]
    room_no: Mapped[str]
    amount: Mapped[float]
    debt_period: Mapped[str]
    created_at: Mapped[datetime] = mapped_column(default=lambda: datetime.now(timezone.utc))


async def init_db() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

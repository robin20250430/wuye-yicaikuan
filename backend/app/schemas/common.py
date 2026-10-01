from datetime import datetime
from pydantic import BaseModel, Field

class LawyerProfile(BaseModel):
    id: str
    name: str
    specialty: str
    experience_years: int
    phone: str
    email: str
    office_address: str
    bio: str
    avatar_url: str | None = None
    success_rate: float = 0.95
    hourly_rate: int = 500
    total_cases: int = 1200
    created_at: datetime

class LawyerListResponse(BaseModel):
    total: int
    lawyers: list[LawyerProfile]

class DashboardStats(BaseModel):
    total_documents: int
    total_orders: int
    total_revenue: float
    active_users: int
    this_month_revenue: float
    this_month_documents: int

class OrderListItem(BaseModel):
    id: str
    plan: str
    amount: float
    status: str
    created_at: datetime

class OrderListResponse(BaseModel):
    total: int
    items: list[OrderListItem]

class DocumentListItem(BaseModel):
    id: str
    document_type: str
    title: str
    owner_name: str
    property_address: str
    overdue_amount: float
    status: str
    created_at: datetime

class DocumentListResponse(BaseModel):
    total: int
    items: list[DocumentListItem]

class BatchTaskItem(BaseModel):
    id: str
    file_name: str
    total_rows: int
    generated_count: int
    status: str
    created_at: datetime

class BatchTaskListResponse(BaseModel):
    total: int
    items: list[BatchTaskItem]

class HealthResponse(BaseModel):
    status: str
    timestamp: datetime

class DocumentGenerateRequest(BaseModel):
    document_type: str = Field(pattern="^(notice|deadline_notice|lawyer_letter|litigation_notice)$")
    property_company: str = Field(min_length=1, max_length=200)
    community_name: str = Field(min_length=1, max_length=200)
    owner_name: str = Field(min_length=1, max_length=100)
    property_address: str = Field(min_length=1, max_length=300)
    overdue_amount: float = Field(gt=0)
    overdue_period: str = Field(min_length=1, max_length=100)
    contract_status: str = Field(default="已签订物业服务合同", max_length=300)
    payment_deadline: str | None = Field(default=None, max_length=100)
    contact_phone: str | None = Field(default=None, max_length=50)

class GeneratedDocument(BaseModel):
    id: str
    document_type: str
    title: str
    content: str
    disclaimer: str
    created_at: datetime

class CalculatorRequest(BaseModel):
    monthly_fee: float = Field(gt=0)
    overdue_months: int = Field(gt=0)
    late_fee_rate: float = Field(ge=0, le=1, default=0.1)
    overdue_days: int = Field(default=0, ge=0)

class CalculatorResponse(BaseModel):
    principal: float
    late_fee: float
    total_amount: float
    overdue_days: int
    note: str

class ArticleSummary(BaseModel):
    id: str
    slug: str
    title: str
    summary: str
    category: str
    updated_at: str

class ArticleDetail(ArticleSummary):
    content: str
    keywords: list[str]

class EnterpriseBatchResponse(BaseModel):
    batch_id: str
    total_rows: int
    generated_count: int
    status: str
    message: str

class OrderResponse(BaseModel):
    order_id: str
    plan: str
    amount: float
    status: str
    payment_url: str | None = None

class UserCreateRequest(BaseModel):
    email: str = Field(..., min_length=3)
    password: str = Field(..., min_length=6)
    company_name: str | None = None

class UserLoginRequest(BaseModel):
    email: str
    password: str

class UserProfile(BaseModel):
    id: str
    email: str
    company_name: str | None = None
    role: str = "user"
    created_at: datetime

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserProfile

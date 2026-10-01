from datetime import datetime, timezone
from pydantic import BaseModel, Field

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

class TemplateItem(BaseModel):
    id: str
    title: str
    category: str
    description: str
    price: str

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

class OrderRequest(BaseModel):
    plan: str
    amount: float
    user_id: str | None = None

class OrderResponse(BaseModel):
    order_id: str
    plan: str
    amount: float
    status: str
    payment_url: str | None = None

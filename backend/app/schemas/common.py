from datetime import datetime
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

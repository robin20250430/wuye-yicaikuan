from fastapi import APIRouter
from ...services.calculator_service import calculate_debt
from ...schemas.common import CalculatorRequest, CalculatorResponse

router = APIRouter()


@router.post("/calculate", response_model=CalculatorResponse)
def calculate(payload: CalculatorRequest) -> CalculatorResponse:
    return calculate_debt(payload)

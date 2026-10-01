from ...schemas.common import CalculatorRequest, CalculatorResponse


def calculate_debt(payload: CalculatorRequest) -> CalculatorResponse:
    principal = payload.monthly_fee * payload.overdue_months
    late_fee = principal * payload.late_fee_rate
    total = principal + late_fee
    return CalculatorResponse(
        principal=round(principal, 2),
        late_fee=round(late_fee, 2),
        total_amount=round(total, 2),
        overdue_days=payload.overdue_days,
        note="本计算仅用于快速预估，具体金额以合同约定及实际结算结果为准。",
    )

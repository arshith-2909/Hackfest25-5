from bson import ObjectId
from datetime import datetime

def create_circle_data(name, created_by, monthly_target, plan_type, risk_level):
    return {
        "name": name,
        "createdBy": created_by,
        "members": [created_by],
        "monthlyTarget": monthly_target,
        "currentPool": 0,
        "investmentPlan": {
            "type": plan_type,
            "riskLevel": risk_level
        },
        "transactions": [],
        "createdAt": datetime.utcnow()
    }

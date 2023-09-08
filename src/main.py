from fastapi import FastAPI
from pydantic import BaseModel
from datetime import date
from typing import List
from src.validate import validate_data

app = FastAPI(title="Unusual Spending API")


class Spending(BaseModel):
    transaction_id: int
    date: date
    price: float
    category: str 
    description: str

class SpendingList(BaseModel):
    spending_item: List[Spending]


@app.post("/validate/")
def validate_spending(spending_list: SpendingList):
    res = validate_data(spending_list) 
    if res:
        return {
            "email_sent": True,
            "email_text": res
        }
    return {
        "send_email": False,
        "email_text": None
    }
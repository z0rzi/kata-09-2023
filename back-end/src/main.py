from fastapi import FastAPI
from pydantic import BaseModel
from datetime import date
from typing import List
from fastapi.middleware.cors import CORSMiddleware

from validate import validate_data, create_email_text


app = FastAPI(title="Unusual Spending API")


origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Spending(BaseModel):
    transaction_id: int
    date: date
    price: float
    category: str 
    description: str

class SpendingList(BaseModel):
    spending_item: List[Spending]


@app.post("/validate/")
def validate_spending(spending_list: List[Spending]):
    spending_dicts = []
    for spending in spending_list:
        spending_dict = {
            "transaction_id": spending.transaction_id,
            "date": str(spending.date),  # Convert date to string in the desired format
            "price": round(spending.price, 2),  # Round price to 2 decimal places
            "category": spending.category,
            "description": spending.description
        }
        spending_dicts.append(spending_dict)
    res = validate_data(spending_dicts) 
    if res:
        return {
            "email_sent": True,
            "email_text": create_email_text(res)
        }
    return {
        "send_email": False,
        "email_text": None
    }
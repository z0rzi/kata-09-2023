from fastapi import FastAPI
from pydantic import BaseModel
from datetime import date
from typing import List
from fastapi.middleware.cors import CORSMiddleware

from validate import validate_data


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
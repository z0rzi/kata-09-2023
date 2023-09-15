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

# Solving CORS problem
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


@app.post("/validate/")
def validate_spending(spending_list: List[Spending], verbose: bool=False):
    """The validaiton endpoint

    Args:
        spending_list (List[Spending]): List containing the Spending objects
        verbose (bool): to provide logs

    Returns:
        dict: 
            `send_email` (bool): If email were sent or not
            `email_text` (str): If email was sent shows the email text 
    """
    res = validate_data(spending_list)
    if res:
        return {
            "email_sent": True,
            "email_text": create_email_text(res)
        }
    return {
        "send_email": False,
        "email_text": ""
    }
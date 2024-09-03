from pydantic import BaseModel


class Extra(BaseModel):
    merchant_id: str | None
    original_amount: float | None
    original_currency_code: str | None
    posting_date: str | None
    time: str | None


class Transaction(BaseModel):
    id: str
    duplicated: bool
    mode: str
    status: str
    made_on: str
    amount: float
    currency_code: str
    description: str | None
    category: str | None
    extra: Extra | None
    account_id: str
    created_at: str
    updated_at: str

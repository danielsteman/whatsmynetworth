from pydantic import BaseModel


class TransactionMetadata(BaseModel):
    merchant_id: str | None = None
    original_amount: float | None = None
    original_currency_code: str | None = None
    posting_date: str | None = None
    time: str | None = None
    id: str | None = None
    type: str | None = None
    payee: str | None = None
    payer: str | None = None
    additional: str | None = None
    payer_information: str | None = None
    account_balance_snapshot: float | None = None
    categorization_confidence: float | None = None


class Transaction(BaseModel):
    id: str
    duplicated: bool | None = None
    mode: str
    status: str
    made_on: str | None = None
    amount: float | None = None
    currency_code: str | None = None
    description: str | None = None
    category: str | None = None
    extra: TransactionMetadata | None = None
    account_id: str | None = None
    created_at: str
    updated_at: str


class ListTransactions(BaseModel):
    identifier: str

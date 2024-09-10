from sqlalchemy import Boolean, Column, Float, ForeignKey, String, Text
from sqlalchemy.orm import relationship

from app.db.base import Base


class TransactionMetadata(Base):
    __tablename__ = "transaction_metadata"

    id = Column(String, primary_key=True)
    merchant_id = Column(String, nullable=True)
    original_amount = Column(Float, nullable=True)
    original_currency_code = Column(String, nullable=True)
    posting_date = Column(String, nullable=True)
    time = Column(String, nullable=True)
    type = Column(String, nullable=True)
    payee = Column(String, nullable=True)
    payer = Column(String, nullable=True)
    additional = Column(Text, nullable=True)
    payer_information = Column(Text, nullable=True)
    account_balance_snapshot = Column(Float, nullable=True)
    categorization_confidence = Column(Float, nullable=True)

    transactions = relationship("Transaction", back_populates="extra")


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(String, primary_key=True)
    duplicated = Column(Boolean, nullable=False)
    mode = Column(String, nullable=False)
    status = Column(String, nullable=False)
    made_on = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    currency_code = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String, nullable=True)
    extra_id = Column(String, ForeignKey("transaction_metadata.id"), nullable=True)
    extra = relationship("TransactionMetadata", back_populates="transactions")
    account_id = Column(String, nullable=False)
    created_at = Column(String, nullable=False)
    updated_at = Column(String, nullable=False)

from sqlalchemy import BigInteger, Column, Float, String

from app.db.base import Base


class Account(Base):
    __tablename__ = "accounts"

    id = Column(BigInteger, primary_key=True)
    name = Column(String)
    nature = Column(String)
    balance = Column(Float)
    currency_code = Column(String)
    connection_id = Column(BigInteger)
    created_at = Column(String)
    updated_at = Column(String)

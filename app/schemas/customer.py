from sqlalchemy import BigInteger, Column, String

from app.db.base import Base


class Customer(Base):
    __tablename__ = "customers"

    id = Column(BigInteger, primary_key=True)
    identifier = Column(String, unique=True, index=True)
    secret = Column(String)
    updated_at = Column(String)
    created_at = Column(String)

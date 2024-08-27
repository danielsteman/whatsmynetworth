from sqlalchemy import BigInteger, Boolean, Column, DateTime, String, Text

from app.db.base import Base


class Connection(Base):
    __tablename__ = "connection"

    id = Column(BigInteger, primary_key=True)
    country_code = Column(String(2), nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False)
    customer_id = Column(String, nullable=False)
    daily_refresh = Column(Boolean, default=False)
    secret = Column(Text, nullable=False)
    categorization = Column(String, nullable=False)
    show_consent_confirmation = Column(Boolean, default=False)
    last_consent_id = Column(String, nullable=True)
    holder_info = Column(Text, nullable=True)
    last_success_at = Column(DateTime(timezone=True), nullable=True)
    next_refresh_possible_at = Column(DateTime(timezone=True), nullable=True)
    provider_id = Column(String, nullable=False)
    provider_code = Column(String, nullable=False)
    provider_name = Column(String, nullable=False)
    status = Column(String, nullable=False)
    store_credentials = Column(Boolean, default=True)
    updated_at = Column(DateTime(timezone=True), nullable=False)

    def __repr__(self) -> str:
        return f"<Connection(id={self.id}, customer_id={self.customer_id}, status={self.status})>"

from datetime import datetime
from typing import List, Literal, Optional

from pydantic import BaseModel


class ConnectionLink(BaseModel):
    expires_at: str
    connect_url: str


class CreateConnection(BaseModel):
    identifier: str


class Address(BaseModel):
    city: str
    state: str
    street: str
    country_code: str
    post_code: str


class HolderInfo(BaseModel):
    names: List[str]
    emails: List[str]
    phone_numbers: List[str]
    addresses: List[Address]


class LastStage(BaseModel):
    created_at: datetime
    id: str
    interactive_fields_names: Optional[str | None]
    interactive_html: Optional[str | None]
    name: str
    updated_at: datetime


class LastAttempt(BaseModel):
    api_mode: str
    api_version: str
    automatic_fetch: bool
    user_present: bool
    daily_refresh: bool
    categorize: bool
    created_at: datetime
    customer_last_logged_at: datetime
    custom_fields: dict
    device_type: str
    remote_ip: str
    exclude_accounts: List[str]
    fail_at: Optional[datetime | None]
    fail_error_class: Optional[str | None]
    fail_message: Optional[str | None]
    fetch_scopes: List[str]
    finished: bool
    finished_recent: bool
    from_date: Optional[datetime | None]
    id: str
    interactive: bool
    locale: str
    partial: bool
    store_credentials: bool
    success_at: Optional[datetime | None]
    to_date: Optional[datetime | None]
    unduplication_strategy: str
    updated_at: datetime
    show_consent_confirmation: bool
    consent_id: str
    include_natures: List[str]
    last_stage: LastStage


class Connection(BaseModel):
    country_code: str
    created_at: datetime
    customer_id: str
    daily_refresh: bool
    id: str
    secret: str
    categorization: str
    show_consent_confirmation: bool
    last_consent_id: str
    last_attempt: LastAttempt
    holder_info: HolderInfo
    last_success_at: Optional[datetime | None]
    next_refresh_possible_at: Optional[datetime | None]
    provider_id: str
    provider_code: str
    provider_name: str
    status: Literal["active", "inactive", "disabled"]
    store_credentials: bool
    updated_at: datetime

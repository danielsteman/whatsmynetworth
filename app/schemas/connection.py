from datetime import datetime
from typing import Literal

from pydantic import BaseModel


class ConnectionLink(BaseModel):
    expires_at: str
    connect_url: str


class CreateConnection(BaseModel):
    identifier: str


class ListConnections(CreateConnection):
    pass


class GetActiveConnection(CreateConnection):
    pass


class Address(BaseModel):
    city: str
    state: str
    street: str
    country_code: str
    post_code: str


class HolderInfo(BaseModel):
    names: list[str]
    emails: list[str]
    phone_numbers: list[str]
    addresses: list[Address]


class LastStage(BaseModel):
    created_at: datetime
    id: str
    interactive_fields_names: list[str] | None
    interactive_html: str | None
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
    customer_last_logged_at: datetime | None
    custom_fields: dict
    device_type: str
    remote_ip: str
    exclude_accounts: list[str]
    fail_at: datetime | None
    fail_error_class: str | None
    fail_message: str | None
    fetch_scopes: list[str]
    finished: bool
    finished_recent: bool
    from_date: datetime | None
    id: str
    interactive: bool
    locale: str
    partial: bool
    store_credentials: bool
    success_at: datetime | None
    to_date: datetime | None
    unduplication_strategy: str
    updated_at: datetime
    show_consent_confirmation: bool
    consent_id: str
    include_natures: list[str] | None
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
    holder_info: HolderInfo | None = None
    last_success_at: datetime | None
    next_refresh_possible_at: datetime | None
    provider_id: str
    provider_code: str
    provider_name: str
    status: Literal["active", "inactive", "disabled"]
    store_credentials: bool
    updated_at: datetime

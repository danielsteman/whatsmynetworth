from datetime import datetime
from typing import Optional

from pydantic import BaseModel, HttpUrl


class SupportedPaymentFields(BaseModel):
    SEPA: list[str]


class RequiredPaymentFields(BaseModel):
    SEPA: list[str]


class Provider(BaseModel):
    id: str
    code: str
    name: str
    mode: str
    status: str
    automatic_fetch: bool
    dynamic_registration_code: Optional[str]
    group_code: Optional[str]
    group_name: Optional[str]
    hub: Optional[str]
    customer_notified_on_sign_in: bool
    interactive: bool
    identification_mode: str
    instruction: str
    home_url: HttpUrl
    login_url: HttpUrl
    logo_url: HttpUrl
    country_code: str
    refresh_timeout: int
    holder_info: list[str]
    max_consent_days: Optional[int]
    created_at: datetime
    updated_at: datetime
    timezone: str
    max_interactive_delay: int
    optional_interactivity: bool
    regulated: bool
    max_fetch_interval: int
    supported_fetch_scopes: list[str]
    supported_account_extra_fields: list[str]
    supported_transaction_extra_fields: list[str]
    supported_account_natures: list[str]
    supported_account_types: list[str]
    identification_codes: list[str]
    bic_codes: list[str]
    supported_iframe_embedding: bool
    payment_templates: list[str]
    supported_payment_fields: Optional[SupportedPaymentFields] = None
    required_payment_fields: Optional[RequiredPaymentFields] = None

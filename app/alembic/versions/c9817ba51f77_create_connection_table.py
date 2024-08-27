"""create connection table

Revision ID: c9817ba51f77
Revises: 0947db5c9447
Create Date: 2024-08-27 21:39:45.328652

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "c9817ba51f77"
down_revision: Union[str, None] = "0947db5c9447"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "connections",
        sa.Column("id", sa.BigInteger, primary_key=True),
        sa.Column("country_code", sa.String(2), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("customer_id", sa.String, nullable=False),
        sa.Column("daily_refresh", sa.Boolean, default=False),
        sa.Column("secret", sa.Text, nullable=False),
        sa.Column("categorization", sa.String, nullable=False),
        sa.Column("show_consent_confirmation", sa.Boolean, default=False),
        sa.Column("last_consent_id", sa.String, nullable=True),
        sa.Column("holder_info", sa.Text, nullable=True),
        sa.Column("last_success_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column(
            "next_refresh_possible_at", sa.DateTime(timezone=True), nullable=True
        ),
        sa.Column("provider_id", sa.String, nullable=False),
        sa.Column("provider_code", sa.String, nullable=False),
        sa.Column("provider_name", sa.String, nullable=False),
        sa.Column("status", sa.String, nullable=False),
        sa.Column("store_credentials", sa.Boolean, default=True),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
    )


def downgrade() -> None:
    op.drop_table("connections")

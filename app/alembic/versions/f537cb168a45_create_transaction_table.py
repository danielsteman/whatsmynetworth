"""create transaction and extra tables

Revision ID: f537cb168a45
Revises: c9817ba51f77
Create Date: 2024-09-09 22:38:24.189892

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "f537cb168a45"
down_revision: Union[str, None] = "c9817ba51f77"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "transaction_metadata",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("merchant_id", sa.String(), nullable=True),
        sa.Column("original_amount", sa.Float(), nullable=True),
        sa.Column("original_currency_code", sa.String(), nullable=True),
        sa.Column("posting_date", sa.String(), nullable=True),
        sa.Column("time", sa.String(), nullable=True),
        sa.Column("type", sa.String(), nullable=True),
        sa.Column("payee", sa.String(), nullable=True),
        sa.Column("payer", sa.String(), nullable=True),
        sa.Column("additional", sa.Text(), nullable=True),
        sa.Column("payer_information", sa.Text(), nullable=True),
        sa.Column("account_balance_snapshot", sa.Float(), nullable=True),
        sa.Column("categorization_confidence", sa.Float(), nullable=True),
    )

    op.create_table(
        "transactions",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("duplicated", sa.Boolean(), nullable=False),
        sa.Column("mode", sa.String(), nullable=False),
        sa.Column("status", sa.String(), nullable=False),
        sa.Column("made_on", sa.String(), nullable=False),
        sa.Column("amount", sa.Float(), nullable=False),
        sa.Column("currency_code", sa.String(), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("category", sa.String(), nullable=True),
        sa.Column(
            "extra_id",
            sa.String(),
            sa.ForeignKey("transaction_metadata.id"),
            nullable=True,
        ),
        sa.Column("account_id", sa.String(), nullable=False),
        sa.Column("created_at", sa.String(), nullable=False),
        sa.Column("updated_at", sa.String(), nullable=False),
    )


def downgrade() -> None:
    op.drop_table("transactions")
    op.drop_table("transaction_metadata")

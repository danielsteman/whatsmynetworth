"""create account table

Revision ID: 0947db5c9447
Revises: bd54f3e3021d
Create Date: 2024-08-26 21:14:29.817979

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "0947db5c9447"
down_revision: Union[str, None] = "bd54f3e3021d"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "accounts",
        sa.Column("id", sa.BigInteger, primary_key=True),
        sa.Column("name", sa.String),
        sa.Column("nature", sa.String),
        sa.Column("balance", sa.Float),
        sa.Column("currency_code", sa.String),
        sa.Column("connection_id", sa.BigInteger),
        sa.Column("created_at", sa.String),
        sa.Column("updated_at", sa.String),
    )


def downgrade() -> None:
    op.drop_table("customers")

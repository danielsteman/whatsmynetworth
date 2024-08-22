"""create customer table

Revision ID: bd54f3e3021d
Revises:
Create Date: 2024-08-22 15:20:35.636240

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "bd54f3e3021d"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "customers",
        sa.Column("id", sa.BigInteger, primary_key=True),
        sa.Column("identifier", sa.String, unique=True, index=True),
        sa.Column("secret", sa.String),
        sa.Column("updated_at", sa.String),
        sa.Column("created_at", sa.String),
    )


def downgrade() -> None:
    op.drop_table("customers")

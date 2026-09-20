"""create final asset hierarchy

Revision ID: f0a8cfa69232
Revises: 506112579f04
Create Date: 2026-09-19 18:44:31.349977

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f0a8cfa69232'
down_revision: Union[str, Sequence[str], None] = '506112579f04'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:

    op.create_foreign_key(
        "fk_connectivity_asset",
        "connectivity_profiles",
        "assets",
        ["asset_id"],
        ["id"]
    )


    op.create_foreign_key(
        "fk_telemetry_asset",
        "telemetry",
        "assets",
        ["asset_id"],
        ["id"]
    )

def downgrade() -> None:

    op.drop_constraint(
        "fk_telemetry_asset",
        "telemetry",
        type_="foreignkey"
    )


    op.drop_constraint(
        "fk_connectivity_asset",
        "connectivity_profiles",
        type_="foreignkey"
    )
import uuid

from sqlalchemy import Column, String, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from app.models.base import Base


class AssetMetric(Base):

    __tablename__ = "asset_metrics"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    asset_id = Column(
        UUID(as_uuid=True),
        ForeignKey("assets.id"),
        nullable=False
    )

    metric_name = Column(
        String,
        nullable=False
    )

    unit = Column(
        String,
        nullable=False
    )

    enabled = Column(
        Boolean,
        default=True
    )
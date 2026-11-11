import uuid

from sqlalchemy import Column, String, Float, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.models.base import Base


class AssetMetricValue(Base):

    __tablename__ = "asset_metric_values"


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


    value = Column(
        Float,
        nullable=True
    )


    unit = Column(
        String,
        nullable=True
    )


    updated_at = Column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now()
    )


    asset = relationship(
        "Asset",
        back_populates="metric_values"
    )
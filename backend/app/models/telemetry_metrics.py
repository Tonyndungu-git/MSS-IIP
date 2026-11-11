from sqlalchemy import Column, String, Float, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from app.database.connection import Base


class Telemetry(Base):

    __tablename__ = "telemetry"


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


    metric = Column(
        String,
        nullable=False
    )


    value = Column(
        Float,
        nullable=False
    )


    unit = Column(
        String,
        nullable=True
    )


    quality = Column(
        String,
        default="GOOD"
    )


    timestamp = Column(
        DateTime,
        default=datetime.utcnow
    )
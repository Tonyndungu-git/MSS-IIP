from sqlalchemy import Column, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB

from datetime import datetime
import uuid

from sqlalchemy.orm import relationship

from app.database.connection import Base


class TelemetryEvent(Base):

    __tablename__ = "telemetry_events"


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


    payload = Column(
        JSONB,
        nullable=False
    )


    timestamp = Column(
        DateTime,
        default=datetime.utcnow
    )


    asset = relationship(
        "Asset",
        back_populates="telemetry_events"
    )
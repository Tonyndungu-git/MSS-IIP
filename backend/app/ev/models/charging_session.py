from sqlalchemy import Column, Float, String, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from datetime import datetime

import uuid

from app.models.base import Base


class ChargingSession(Base):

    __tablename__ = "ev_charging_sessions"


    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )


    vehicle_id = Column(
        UUID(as_uuid=True),
        ForeignKey("ev_vehicles.id"),
        nullable=True
    )


    connector_id = Column(
        UUID(as_uuid=True),
        ForeignKey("ev_connectors.id"),
        nullable=True
    )


    start_soc = Column(
        Float
    )


    end_soc = Column(
        Float
    )


    energy_delivered_kwh = Column(
        Float,
        default=0
    )


    status = Column(
        String,
        default="ACTIVE"
    )


    started_at = Column(
        DateTime,
        default=datetime.utcnow
    )


    ended_at = Column(
        DateTime
    )


    vehicle = relationship(
        "Vehicle",
        back_populates="charging_sessions"
    )


    connector = relationship(
        "Connector",
        back_populates="sessions"
    )
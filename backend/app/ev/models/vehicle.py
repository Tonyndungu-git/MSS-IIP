from sqlalchemy import Column, String, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

import uuid

from app.models.base import Base


class Vehicle(Base):

    __tablename__ = "ev_vehicles"


    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )


    asset_id = Column(
        UUID(as_uuid=True),
        ForeignKey("assets.id"),
        nullable=False,
        unique=True
    )


    vin = Column(
        String,
        unique=True,
        nullable=False
    )


    manufacturer = Column(
        String
    )


    model = Column(
        String
    )


    battery_capacity_kwh = Column(
        Float
    )


    estimated_range_km = Column(
        Float
    )


    current_soc = Column(
        Float,
        default=100
    )


    status = Column(
        String,
        default="AVAILABLE"
    )


    asset = relationship(
        "Asset",
        back_populates="vehicle"
    )


    charging_sessions = relationship(
        "ChargingSession",
        back_populates="vehicle"
    )
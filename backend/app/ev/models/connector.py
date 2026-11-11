from sqlalchemy import Column, String, Float, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

import uuid

from app.models.base import Base


class Connector(Base):

    __tablename__ = "ev_connectors"


    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )


    charger_id = Column(
        UUID(as_uuid=True),
        ForeignKey("ev_chargers.id"),
        nullable=True
    )


    station_id = Column(
        UUID(as_uuid=True),
        ForeignKey("ev_charging_stations.id"),
        nullable=False
    )


    connector_type = Column(
        String
    )


    connector_number = Column(
        String
    )


    max_power_kw = Column(
        Float
    )


    is_operational = Column(
        Boolean,
        default=True
    )


    status = Column(
        String,
        default="AVAILABLE"
    )


    charger = relationship(
        "Charger",
        back_populates="connectors"
    )


    station = relationship(
        "ChargingStation",
        back_populates="connectors"
    )


    sessions = relationship(
        "ChargingSession",
        back_populates="connector"
    )
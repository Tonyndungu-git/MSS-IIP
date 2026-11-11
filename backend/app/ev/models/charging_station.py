import uuid

from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from app.models.base import Base

from sqlalchemy.orm import relationship


class ChargingStation(Base):

    __tablename__ = "ev_charging_stations"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    site_id = Column(
        UUID(as_uuid=True),
        ForeignKey("sites.id"),
        nullable=False,
    )

    name = Column(
        String,
        nullable=False,
    )

    operator = Column(
        String,
        nullable=True,
    )

    status = Column(
        String,
        default="ONLINE",
    )

    connectors = relationship(
        "Connector",
        back_populates="station"
    )
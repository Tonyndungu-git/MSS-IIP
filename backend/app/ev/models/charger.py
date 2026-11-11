from sqlalchemy import Column, String, Float, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

import uuid

from app.models.base import Base


class Charger(Base):

    __tablename__ = "ev_chargers"


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


    charger_type = Column(
        String
    )


    manufacturer = Column(
        String
    )


    model = Column(
        String
    )


    power_rating_kw = Column(
        Float
    )


    number_of_ports = Column(
        Integer,
        default=1
    )


    protocol = Column(
        String
    )


    status = Column(
        String,
        default="ONLINE"
    )


    asset = relationship(
        "Asset",
        back_populates="charger"
    )


    connectors = relationship(
        "Connector",
        back_populates="charger"
    )
from uuid import uuid4
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.models.base import Base
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship


class Asset(Base):

    __tablename__ = "assets"


    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid4
    )

    name = Column(
        String,
        nullable=False
    )


    asset_type = Column(
        String,
        nullable=False
    )


    manufacturer = Column(
        String
    )


    model = Column(
        String
    )


    serial_number = Column(
        String,
        unique=True
    )

    properties = Column(
        JSONB,
        default={}
    )

    organization_id = Column(
        UUID,
        ForeignKey("organizations.id"),
        nullable=False
    )


    site_id = Column(
        UUID,
        ForeignKey("sites.id"),
        nullable=False
    )


    gateway_id = Column(
        UUID,
        ForeignKey("gateways.id"),
        nullable=True
    )

    status = Column(
        String,
        default="REGISTERED"
    )

    vehicle = relationship(
        "Vehicle",
        back_populates="asset",
        uselist=False
    )


    charger = relationship(
        "Charger",
        back_populates="asset",
        uselist=False
    )

    telemetry_events = relationship(
        "TelemetryEvent",
        back_populates="asset",
        cascade="all, delete-orphan"
    )

    asset_metrics = relationship(
        "AssetMetric",
        back_populates="asset",
        cascade="all, delete-orphan"
    )



    metric_values = relationship(
        "AssetMetricValue",
        back_populates="asset",
        cascade="all, delete-orphan"
    )
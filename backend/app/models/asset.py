from uuid import uuid4
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.models.base import Base


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
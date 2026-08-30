import uuid

from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from app.database.connection import Base
from app.models.base import TimestampMixin


class Asset(Base):

    __tablename__="assets"


    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )


    site_id = Column(
        UUID(as_uuid=True),
        ForeignKey("sites.id")
    )


    asset_code = Column(
        String,
        unique=True,
        nullable=False
    )


    asset_type = Column(
        String
    )


    name = Column(
        String
    )


    manufacturer = Column(
        String
    )
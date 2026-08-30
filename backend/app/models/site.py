import uuid

from sqlalchemy import Column, String, ForeignKey, Float
from sqlalchemy.dialects.postgresql import UUID

from app.database.connection import Base
from app.models.base import TimestampMixin


class Site(
    Base,
    TimestampMixin
):

    __tablename__ = "sites"


    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )


    organization_id = Column(
        UUID(as_uuid=True),
        ForeignKey("organizations.id")
    )


    name = Column(
        String
    )


    latitude = Column(
        Float
    )


    longitude = Column(
        Float
    )


    status = Column(
        String,
        default="active"
    )
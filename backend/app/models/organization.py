import uuid

from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID

from app.database.connection import Base
from app.models.base import TimestampMixin


class Organization(
    Base,
    TimestampMixin
):

    __tablename__ = "organizations"


    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )


    name = Column(
        String,
        nullable=False
    )


    industry = Column(
        String
    )
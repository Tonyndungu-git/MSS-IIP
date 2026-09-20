from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID

import uuid

from app.models.base import Base


class Site(Base):

    __tablename__ = "sites"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    name = Column(
        String,
        nullable=False
    )

    latitude = Column(
        Float
    )

    longitude = Column(
        Float
    )

    location = Column(
        String
    )

    organization_id = Column(
        UUID(as_uuid=True),
        ForeignKey("organizations.id"),
        nullable=False
    )
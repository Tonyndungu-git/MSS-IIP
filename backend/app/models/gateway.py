from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy import Integer
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from sqlalchemy.dialects.postgresql import UUID

from datetime import datetime

import uuid

from app.models.base import Base



class Gateway(Base):

    __tablename__ = "gateways"


    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )


    name = Column(
        String,
        nullable=False
    )


    manufacturer = Column(
        String
    )


    protocol = Column(
        String,
        nullable=False
    )


    connection_type = Column(
        String,
        nullable=False
    )


    ip_address = Column(
        String
    )


    port = Column(
        Integer
    )


    status = Column(
        String,
        default="OFFLINE"
    )


    site_id = Column(
        UUID(as_uuid=True),
        ForeignKey("sites.id"),
        nullable=False
    )


    last_seen = Column(
        DateTime
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
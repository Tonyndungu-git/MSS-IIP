from sqlalchemy import Column, String, DateTime, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from app.database.connection import Base


class ConnectivityProfile(Base):

    __tablename__="connectivity_profiles"


    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )


    asset_id = Column(
        UUID(as_uuid=True),
        ForeignKey("assets.id")
    )


    gateway_id = Column(
        UUID(as_uuid=True),
        ForeignKey("gateways.id")
    )


    connection_type = Column(
        String
    )


    protocol = Column(
        String
    )


    endpoint = Column(
        String
    )


    configuration = Column(
        JSON
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
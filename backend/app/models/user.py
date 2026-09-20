from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from app.database.connection import Base


class User(Base):

    __tablename__="users"


    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )


    organization_id = Column(
        UUID(as_uuid=True),
        ForeignKey("organizations.id")
    )


    email = Column(
        String,
        unique=True
    )


    role = Column(
        String,
        default="VIEWER"
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
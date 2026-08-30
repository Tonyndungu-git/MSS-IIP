import uuid

from sqlalchemy import Column,String,Float,ForeignKey,DateTime

from sqlalchemy.dialects.postgresql import UUID

from sqlalchemy.sql import func

from app.database.connection import Base



class Telemetry(Base):

    __tablename__="telemetry"


    id=Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )


    asset_code = Column(
        String,
        index=True
    )


    metric=Column(
        String
    )


    value=Column(
        Float
    )


    unit=Column(
        String
    )


    timestamp=Column(
        DateTime,
        server_default=func.now()
    )
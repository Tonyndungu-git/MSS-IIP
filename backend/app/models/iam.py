from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.database.connection import Base


class Role(Base):

    __tablename__ = "roles"

    id = Column(
        Integer,
        primary_key=True
    )

    name = Column(
        String,
        unique=True,
        nullable=False
    )

    description = Column(
        String
    )



class Permission(Base):

    __tablename__ = "permissions"

    id = Column(
        Integer,
        primary_key=True
    )

    name = Column(
        String,
        unique=True
    )



class UserRole(Base):

    __tablename__ = "user_roles"

    id = Column(
        Integer,
        primary_key=True
    )

    user_id = Column(
        UUID(as_uuid=True),
        nullable=False
    )

    organization_id = Column(
        UUID(as_uuid=True),
        ForeignKey("organizations.id"),
        nullable=False
    )

    role_id = Column(
        Integer,
        ForeignKey("roles.id"),
        nullable=False
    )

    role = relationship(
        "Role"
    )

    organization = relationship(
        "Organization"
    )
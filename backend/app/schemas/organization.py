from pydantic import BaseModel
from uuid import UUID
from datetime import datetime


class OrganizationCreate(BaseModel):

    name: str
    industry: str


class OrganizationResponse(BaseModel):

    id: UUID
    name: str
    industry: str
    created_at: datetime


    class Config:
        from_attributes = True
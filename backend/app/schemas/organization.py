from uuid import UUID

from pydantic import BaseModel, ConfigDict


class OrganizationCreate(BaseModel):

    name: str
    industry: str
    country: str


class OrganizationResponse(BaseModel):

    id: UUID
    name: str
    industry: str
    country: str

    model_config = ConfigDict(
        from_attributes=True
    )
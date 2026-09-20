from uuid import UUID

from pydantic import BaseModel, ConfigDict


class SiteCreate(BaseModel):

    name: str

    latitude: float

    longitude: float

    location: str

    organization_id: UUID


class SiteResponse(BaseModel):

    id: UUID

    name: str

    latitude: float

    longitude: float

    location: str

    organization_id: UUID

    model_config = ConfigDict(
        from_attributes=True
    )
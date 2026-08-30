from pydantic import BaseModel
from uuid import UUID


class SiteCreate(BaseModel):

    organization_id: UUID
    name: str
    latitude: float
    longitude: float


class SiteResponse(SiteCreate):

    id: UUID

    class Config:
        from_attributes = True
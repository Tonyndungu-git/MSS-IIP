from pydantic import BaseModel
from uuid import UUID


class AssetCreate(BaseModel):

    site_id: UUID
    asset_type: str
    name: str
    serial_number: str
    manufacturer: str


class AssetResponse(AssetCreate):

    id: UUID
    status: str
    health_score: int


    class Config:
        from_attributes=True
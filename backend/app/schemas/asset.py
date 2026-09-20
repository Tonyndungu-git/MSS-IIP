from typing import Optional
from uuid import UUID
from pydantic import BaseModel


class AssetCreate(BaseModel):
    name: str
    asset_type: str
    manufacturer: str
    model: str
    serial_number: str

    organization_id: UUID
    site_id: UUID

    gateway_id: Optional[UUID] = None



class AssetResponse(BaseModel):

    id: UUID

    name: str
    asset_type: str
    manufacturer: str
    model: str
    serial_number: str

    status: str

    organization_id: UUID
    site_id: UUID
    gateway_id: Optional[UUID] = None


    class Config:
        from_attributes = True
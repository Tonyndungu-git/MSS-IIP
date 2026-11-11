from pydantic import BaseModel
from typing import Optional
from uuid import UUID


class StationCreate(BaseModel):

    site_id: UUID

    name: str

    latitude: Optional[float] = None

    longitude: Optional[float] = None

    status: Optional[str] = "ONLINE"
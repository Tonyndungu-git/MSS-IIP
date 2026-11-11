from pydantic import BaseModel
from typing import Optional
from uuid import UUID


class ChargerCreate(BaseModel):

    asset_id: UUID

    manufacturer: Optional[str] = None

    model: Optional[str] = None

    power_rating_kw: Optional[float] = None

    number_of_ports: Optional[int] = 1

    protocol: Optional[str] = None

    status: Optional[str] = "ONLINE"
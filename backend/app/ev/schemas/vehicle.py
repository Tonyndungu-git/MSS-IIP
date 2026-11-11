from pydantic import BaseModel
from typing import Optional
from uuid import UUID


class VehicleCreate(BaseModel):

    asset_id: UUID

    vin: str

    manufacturer: Optional[str] = None

    model: Optional[str] = None

    battery_capacity_kwh: Optional[float] = None

    current_soc: Optional[float] = 100

    status: Optional[str] = "AVAILABLE"
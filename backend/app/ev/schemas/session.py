from pydantic import BaseModel
from typing import Optional
from uuid import UUID


class ChargingSessionCreate(BaseModel):

    vehicle_id: UUID

    connector_id: UUID

    start_soc: Optional[float] = None

    end_soc: Optional[float] = None

    energy_delivered_kwh: Optional[float] = 0

    status: Optional[str] = "ACTIVE"
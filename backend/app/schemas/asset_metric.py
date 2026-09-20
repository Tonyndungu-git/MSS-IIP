from uuid import UUID
from pydantic import BaseModel


class MetricItem(BaseModel):

    metric_name: str

    unit: str


class AssetMetricSetup(BaseModel):

    asset_id: UUID

    metrics: list[MetricItem]


class AssetMetricResponse(BaseModel):

    id: str

    asset_id: str

    metric_name: str

    unit: str

    enabled: bool

    class Config:

        from_attributes = True
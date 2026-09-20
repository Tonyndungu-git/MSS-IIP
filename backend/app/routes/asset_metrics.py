from uuid import uuid4

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.models.asset_metric import AssetMetric

from app.schemas.asset_metric import AssetMetricSetup

router = APIRouter(
    prefix="/asset-metrics",
    tags=["Asset Metrics"]
)


@router.post("/setup")
def setup_asset_metrics(
    request: AssetMetricSetup,
    db: Session = Depends(get_db)
):

    created = []

    for metric in request.metrics:

        row = AssetMetric(

            id=uuid4(),

            asset_id=request.asset_id,

            metric_name=metric.metric_name,

            unit=metric.unit,

            enabled=True
        )

        db.add(row)

        created.append(row)

    db.commit()

    return {

        "message": "Asset configured successfully.",

        "asset_id": str(request.asset_id),

        "metrics_created": len(created),

        "metrics": [

            {
                "metric_name": m.metric_name,
                "unit": m.unit
            }

            for m in created
        ]
    }
from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal
from app.models.asset import Asset
from app.models.asset_metric_value import AssetMetricValue

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/assets/{asset_id}")
def latest_metrics(asset_id: str):

    db: Session = SessionLocal()

    try:

        asset = (
            db.query(Asset)
            .filter(
                Asset.serial_number == asset_id
            )
            .first()
        )

        if not asset:
            return {"error": "Asset not found"}

        metrics = (
            db.query(AssetMetricValue)
            .filter(
                AssetMetricValue.asset_id == asset.id
            )
            .all()
        )

        return {
            "asset": asset.name,
            "status": asset.status,
            "metrics": {
                metric.metric_name: metric.value
                for metric in metrics
            }
        }

    finally:
        db.close()
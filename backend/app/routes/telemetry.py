from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.models.asset import Asset
from app.models.asset_metric_value import AssetMetricValue
from app.models.telemetry_event import TelemetryEvent

from app.auth.organization import current_organization


router = APIRouter(
    prefix="/telemetry",
    tags=["Telemetry"]
)


# Latest telemetry for ONE asset
@router.get("/latest/{asset_id}")
def latest_asset_telemetry(
    asset_id: str,
    db: Session = Depends(get_db),
    organization_id = Depends(current_organization)
):

    asset = (
        db.query(Asset)
        .filter(
            Asset.id == asset_id,
            Asset.organization_id == organization_id
        )
        .first()
    )


    if not asset:
        raise HTTPException(
            status_code=404,
            detail="Asset not found"
        )


    metrics = (
        db.query(AssetMetricValue)
        .filter(
            AssetMetricValue.asset_id == asset.id
        )
        .all()
    )


    return {

        "asset_id": str(asset.id),

        "asset_name": asset.name,

        "asset_type": asset.asset_type,

        "status": asset.status,

        "metrics": {
            metric.metric_name: metric.value
            for metric in metrics
        }
    }



# Historical telemetry for one asset
@router.get("/history/{serial}")
def telemetry_history(
    serial: str,
    db: Session = Depends(get_db),
    organization_id = Depends(current_organization)
):

    asset = (
        db.query(Asset)
        .filter(
            Asset.serial_number == serial,
            Asset.organization_id == organization_id
        )
        .first()
    )


    if not asset:
        raise HTTPException(
            status_code=404,
            detail="Asset not found"
        )


    events = (
        db.query(TelemetryEvent)
        .filter(
            TelemetryEvent.asset_id == asset.id
        )
        .order_by(
            TelemetryEvent.timestamp.asc()
        )
        .limit(200)
        .all()
    )


    return {

        "asset": asset.name,

        "serial_number": asset.serial_number,

        "history": [

            {
                "timestamp": event.timestamp,
                "data": event.payload
            }

            for event in events

        ]
    }




# Latest telemetry stream for current organization
@router.get("/latest")
def latest_telemetry_stream(
    db: Session = Depends(get_db),
    organization_id = Depends(current_organization)
):


    events = (
        db.query(TelemetryEvent)
        .join(
            Asset,
            TelemetryEvent.asset_id == Asset.id
        )
        .filter(
            Asset.organization_id == organization_id
        )
        .order_by(
            TelemetryEvent.timestamp.desc()
        )
        .limit(50)
        .all()
    )


    return [

        {
            "asset_id": str(event.asset_id),
            "payload": event.payload,
            "timestamp": event.timestamp
        }

        for event in events

    ]
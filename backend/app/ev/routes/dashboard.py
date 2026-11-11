from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.models.asset import Asset
from app.models.telemetry_event import TelemetryEvent

from app.models.site import Site


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/summary")
def dashboard_summary(
    db: Session = Depends(get_db)
):

    total_assets = (
        db.query(Asset)
        .count()
    )


    registered = (
        db.query(Asset)
        .filter(
            Asset.status == "REGISTERED"
        )
        .count()
    )


    telemetry_events = (
        db.query(TelemetryEvent)
        .count()
    )


    return {

        "total_assets": total_assets,

        "registered_assets": registered,

        "telemetry_events": telemetry_events

    }

@router.get("/assets")
def dashboard_assets(
    db: Session = Depends(get_db)
):

    assets = (
        db.query(Asset)
        .all()
    )


    return [

        {
            "id": str(asset.id),
            "name": asset.name,
            "type": asset.asset_type,
            "serial_number": asset.serial_number,
            "status": asset.status,
            "site_id": str(asset.site_id)

        }

        for asset in assets

    ]

@router.get("/sites")
def dashboard_sites(
    db: Session = Depends(get_db)
):

    sites = (
        db.query(Site)
        .all()
    )


    return [

        {
            "id": str(site.id),
            "name": site.name,
            "location": site.location
        }

        for site in sites

    ]

@router.get("/map")
def dashboard_map(
    db: Session = Depends(get_db)
):

    assets = (
        db.query(Asset)
        .all()
    )


    result = []


    for asset in assets:

        result.append({

            "asset_id": str(asset.id),

            "name": asset.name,

            "type": asset.asset_type,

            "status": asset.status,

            "site_id": str(asset.site_id),

            "properties": asset.properties

        })


    return result

@router.get("/recent-events")
def recent_events(
    db: Session = Depends(get_db)
):

    events = (
        db.query(TelemetryEvent)
        .order_by(
            TelemetryEvent.timestamp.desc()
        )
        .limit(20)
        .all()
    )


    return [

        {
            "asset_id": str(event.asset_id),
            "timestamp": event.timestamp,
            "payload": event.payload
        }

        for event in events

    ]
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.telemetry import Telemetry


router = APIRouter(
    prefix="/telemetry",
    tags=["Telemetry"]
)


@router.get("/latest")
def get_latest_telemetry(
    db: Session = Depends(get_db)
):

    rows = (
        db.query(Telemetry)
        .order_by(
            Telemetry.timestamp.desc()
        )
        .limit(20)
        .all()
    )


    latest = {}

    for row in rows:

        if row.metric not in latest:

            latest[row.metric] = {
                "id": str(row.id),
                "asset_code": row.asset_code,
                "metric": row.metric,
                "value": row.value,
                "unit": row.unit,
                "timestamp": row.timestamp
            }


    return {
        "asset_code": rows[0].asset_code if rows else None,
        "telemetry": list(latest.values())
    }
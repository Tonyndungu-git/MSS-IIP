from sqlalchemy.orm import Session

from app.models.telemetry import Telemetry
from app.ev.models.vehicle import Vehicle
from app.ev.models.charger import Charger
from app.ev.models.connector import Connector


class EVTelemetryService:

    @staticmethod
    def latest_asset_metrics(db: Session, asset_id):

        rows = (
            db.query(Telemetry)
            .filter(Telemetry.asset_id == asset_id)
            .order_by(Telemetry.timestamp.desc())
            .all()
        )

        latest = {}

        for row in rows:
            if row.metric not in latest:
                latest[row.metric] = {
                    "value": row.value,
                    "unit": row.unit,
                    "timestamp": row.timestamp,
                }

        return latest

    @staticmethod
    def vehicle_status(db: Session, vehicle_id):

        vehicle = db.query(Vehicle).filter(
            Vehicle.id == vehicle_id
        ).first()

        if not vehicle:
            return None

        return {
            "vehicle": vehicle,
            "telemetry": EVTelemetryService.latest_asset_metrics(
                db,
                vehicle.asset_id,
            ),
        }

    @staticmethod
    def charger_status(db: Session, charger_id):

        charger = db.query(Charger).filter(
            Charger.id == charger_id
        ).first()

        if not charger:
            return None

        return {
            "charger": charger,
            "telemetry": EVTelemetryService.latest_asset_metrics(
                db,
                charger.asset_id,
            ),
        }
from sqlalchemy.orm import Session

from app.models.asset import Asset
from app.models.telemetry import Telemetry



def get_asset_overview(
    asset_code: str,
    db: Session
):

    asset = (
        db.query(Asset)
        .filter(
            Asset.asset_code == asset_code
        )
        .first()
    )


    if not asset:
        return None



    latest_telemetry = (
        db.query(Telemetry)
        .filter(
            Telemetry.asset_code == asset_code
        )
        .order_by(
            Telemetry.timestamp.desc()
        )
        .first()
    )



    return {

        "asset": {

            "code": asset.asset_code,

            "name": asset.name,

            "type": asset.asset_type,

            "manufacturer": asset.manufacturer

        },


        "telemetry": {

            "metric":
                latest_telemetry.metric
                if latest_telemetry
                else None,


            "value":
                latest_telemetry.value
                if latest_telemetry
                else None,


            "unit":
                latest_telemetry.unit
                if latest_telemetry
                else None,


            "timestamp":
                latest_telemetry.timestamp
                if latest_telemetry
                else None

        },


        "health": {

            "status": "NORMAL",

            "alerts": 0

        }

    }
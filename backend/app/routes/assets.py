from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.asset import Asset
from app.models.telemetry import Telemetry

from app.schemas.asset import AssetCreate, AssetResponse


router = APIRouter(
    prefix="/assets",
    tags=["Assets"]
)



@router.post("/", response_model=AssetResponse)
def create_asset(
    asset: AssetCreate,
    db: Session = Depends(get_db)
):

    db_asset = Asset(

        name=asset.name,
        asset_type=asset.asset_type,
        manufacturer=asset.manufacturer,
        model=asset.model,
        serial_number=asset.serial_number,
        organization_id=asset.organization_id,
        site_id=asset.site_id,
        gateway_id=asset.gateway_id

    )


    db.add(db_asset)

    db.commit()

    db.refresh(db_asset)


    return db_asset





@router.get("/")
def get_assets(
    db: Session = Depends(get_db)
):

    assets = db.query(Asset).all()


    result=[]


    for asset in assets:


        telemetry_rows = (
            db.query(Telemetry)
            .filter(
                Telemetry.asset_id == asset.id
            )
            .order_by(
                Telemetry.timestamp.desc()
            )
            .limit(50)
            .all()
        )


        telemetry={}


        for row in telemetry_rows:

            if row.metric not in telemetry:

                telemetry[row.metric]=row.value



        result.append({

            "id":str(asset.id),

            "name":asset.name,

            "asset_type":asset.asset_type,

            "manufacturer":asset.manufacturer,

            "model":asset.model,

            "serial_number":asset.serial_number,

            "status":asset.status,


            "telemetry":telemetry,


            "health_score":95


        })



    return result







@router.get("/{asset_id}")
def get_asset(

    asset_id:str,

    db:Session=Depends(get_db)

):


    asset = (
        db.query(Asset)
        .filter(
            Asset.id==asset_id
        )
        .first()
    )


    if not asset:

        raise HTTPException(
            status_code=404,
            detail="Asset not found"
        )



    rows=(

        db.query(Telemetry)

        .filter(
            Telemetry.asset_id==asset.id
        )

        .order_by(
            Telemetry.timestamp.desc()
        )

        .limit(50)

        .all()

    )


    telemetry={}


    for row in rows:

        if row.metric not in telemetry:

            telemetry[row.metric]=row.value



    return {


        "id":str(asset.id),

        "name":asset.name,

        "asset_type":asset.asset_type,

        "manufacturer":asset.manufacturer,

        "model":asset.model,

        "serial_number":asset.serial_number,

        "status":asset.status,


        "telemetry":telemetry,


        "health_score":95

    }
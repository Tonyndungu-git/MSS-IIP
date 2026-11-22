from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.asset import Asset
from app.models.site import Site
from app.models.organization import Organization
from app.models.telemetry_event import TelemetryEvent

from app.schemas.asset import AssetCreate, AssetResponse

from app.auth.organization import current_organization


router = APIRouter(
    prefix="/assets",
    tags=["Assets"]
)



# =====================================================
# CREATE ASSET
# Organization comes from authenticated user
# =====================================================

@router.post("/", response_model=AssetResponse)
def create_asset(
    asset: AssetCreate,
    db: Session = Depends(get_db),
    organization_id = Depends(current_organization)
):


    # ---------------------------------------------
    # Validate site exists
    # ---------------------------------------------

    site = (
        db.query(Site)
        .filter(
            Site.id == asset.site_id
        )
        .first()
    )


    if not site:

        raise HTTPException(
            status_code=404,
            detail="Site does not exist"
        )



    # ---------------------------------------------
    # Validate site belongs to tenant
    # ---------------------------------------------

    if site.organization_id != organization_id:

        raise HTTPException(
            status_code=403,
            detail="Site does not belong to your organization"
        )



    # ---------------------------------------------
    # Create asset
    # ---------------------------------------------

    db_asset = Asset(

        name=asset.name,

        asset_type=asset.asset_type,

        manufacturer=asset.manufacturer,

        model=asset.model,

        serial_number=asset.serial_number,


        # SECURITY:
        # Never trust frontend organization_id
        organization_id=organization_id,


        site_id=asset.site_id,

        gateway_id=asset.gateway_id

    )



    db.add(db_asset)

    db.commit()

    db.refresh(db_asset)



    return db_asset






# =====================================================
# GET ALL ASSETS FOR CURRENT TENANT
# =====================================================

@router.get("/")
def get_assets(

    db: Session = Depends(get_db),

    organization_id = Depends(current_organization)

):


    assets = (

        db.query(Asset)

        .filter(
            Asset.organization_id == organization_id
        )

        .all()

    )



    result = []



    for asset in assets:



        telemetry_rows = (

            db.query(TelemetryEvent)

            .filter(
                TelemetryEvent.asset_id == asset.id
            )

            .order_by(
                TelemetryEvent.timestamp.desc()
            )

            .limit(50)

            .all()

        )



        telemetry = {}



        for row in telemetry_rows:

            if row.payload:

                telemetry.update(row.payload)




        result.append({

            "id": str(asset.id),

            "name": asset.name,

            "asset_type": asset.asset_type,

            "manufacturer": asset.manufacturer,

            "model": asset.model,

            "serial_number": asset.serial_number,

            "status": asset.status,


            "telemetry": telemetry,


            # Temporary intelligence placeholder
            "health_score": 95

        })



    return result






# =====================================================
# GET SINGLE ASSET
# Tenant protected
# =====================================================

@router.get("/{asset_id}")
def get_asset(

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





    rows = (

        db.query(TelemetryEvent)

        .filter(

            TelemetryEvent.asset_id == asset.id

        )

        .order_by(

            TelemetryEvent.timestamp.desc()

        )

        .limit(50)

        .all()

    )



    telemetry = {}



    for row in rows:


        if row.payload:

            telemetry.update(row.payload)




    return {


        "id": str(asset.id),

        "name": asset.name,

        "asset_type": asset.asset_type,

        "manufacturer": asset.manufacturer,

        "model": asset.model,

        "serial_number": asset.serial_number,

        "status": asset.status,


        "telemetry": telemetry,


        "health_score": 95

    }
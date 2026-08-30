from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.asset import Asset
from app.schemas.asset import AssetCreate


router = APIRouter(
    prefix="/assets",
    tags=["Assets"]
)



@router.post("/")
def create_asset(
    asset: AssetCreate,
    db: Session = Depends(get_db)
):

    new_asset = Asset(
        **asset.dict()
    )

    db.add(new_asset)
    db.commit()
    db.refresh(new_asset)

    return new_asset



@router.get("/")
def get_assets(
    db: Session = Depends(get_db)
):

    return db.query(Asset).all()
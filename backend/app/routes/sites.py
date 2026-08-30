from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.site import Site
from app.schemas.site import SiteCreate


router = APIRouter(
    prefix="/sites",
    tags=["Sites"]
)



@router.post("/")
def create_site(
    site: SiteCreate,
    db: Session = Depends(get_db)
):

    new_site = Site(
        **site.dict()
    )

    db.add(new_site)
    db.commit()
    db.refresh(new_site)

    return new_site



@router.get("/")
def get_sites(
    db: Session = Depends(get_db)
):

    return db.query(Site).all()
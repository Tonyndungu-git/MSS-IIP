from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.site import Site

from app.schemas.site import (
    SiteCreate,
    SiteResponse
)

from app.auth.organization import current_organization


router = APIRouter(
    prefix="/sites",
    tags=["Sites"]
)



# CREATE SITE
@router.post(
    "/",
    response_model=SiteResponse
)
def create_site(
    site: SiteCreate,
    db: Session = Depends(get_db),
    organization_id = Depends(current_organization)
):

    new_site = Site(

        name=site.name,

        latitude=site.latitude,

        longitude=site.longitude,

        location=site.location,

        # Always use logged-in tenant
        organization_id=organization_id

    )


    db.add(new_site)

    db.commit()

    db.refresh(new_site)


    return new_site






# GET LOGGED-IN ORGANIZATION SITES
@router.get(
    "/",
    response_model=list[SiteResponse]
)
def get_sites(

    db: Session = Depends(get_db),

    organization_id = Depends(current_organization)

):


    sites = (
        db.query(Site)
        .filter(
            Site.organization_id == organization_id
        )
        .all()
    )


    return sites
from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.organization import Organization

from app.schemas.organization import (
    OrganizationCreate,
    OrganizationResponse
)



router = APIRouter(
    prefix="/organizations",
    tags=["Organizations"]
)



@router.post(
    "/",
    response_model=OrganizationResponse
)
def create_organization(
    organization:OrganizationCreate,
    db:Session=Depends(get_db)
):


    new_org = Organization(

        name=organization.name,

        industry=organization.industry,

        country=organization.country

    )


    db.add(new_org)

    db.commit()

    db.refresh(new_org)


    return new_org





@router.get("/")
def get_organizations(
    db:Session=Depends(get_db)
):

    return db.query(
        Organization
    ).all()
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID

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
    organization: OrganizationCreate,
    db: Session = Depends(get_db)
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
    organization_id: str,
    db: Session = Depends(get_db)
):

    try:

        org_uuid = UUID(organization_id)

    except ValueError:

        raise HTTPException(
            status_code=400,
            detail="Invalid organization ID"
        )



    organization = (

        db.query(Organization)

        .filter(
            Organization.id == org_uuid
        )

        .first()

    )



    if not organization:

        raise HTTPException(
            status_code=404,
            detail="Organization not found"
        )



    return [
        organization
    ]
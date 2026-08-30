from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.organization import Organization
from app.schemas.organization import OrganizationCreate


router = APIRouter(
    prefix="/organizations",
    tags=["Organizations"]
)


@router.post("/")
def create_organization(
    organization: OrganizationCreate,
    db: Session = Depends(get_db)
):

    new_org = Organization(
        name=organization.name,
        industry=organization.industry
    )

    db.add(new_org)
    db.commit()
    db.refresh(new_org)

    return new_org



@router.get("/")
def get_organizations(
    db: Session = Depends(get_db)
):

    return db.query(Organization).all()
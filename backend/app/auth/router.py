from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID

from app.database.connection import get_db
from app.models.organization import Organization
from app.models.iam import UserRole, Role


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register-tenant")
def register_tenant(
    payload: dict,
    db: Session = Depends(get_db)
):

    user_id = payload.get("user_id")

    if not user_id:
        raise HTTPException(
            status_code=400,
            detail="Supabase user id required"
        )


    organization_name = payload.get(
        "organization_name"
    )


    if not organization_name:

        raise HTTPException(
            status_code=400,
            detail="Organization name required"
        )



    existing = (
        db.query(Organization)
        .filter(
            Organization.name == organization_name
        )
        .first()
    )


    if existing:

        raise HTTPException(
            status_code=400,
            detail="Organization already exists"
        )



    organization = Organization(

        name=organization_name,

        industry=payload.get(
            "industry",
            "Industrial"
        ),

        country=payload.get(
            "country",
            "Unknown"
        )

    )


    db.add(organization)

    db.commit()

    db.refresh(organization)




    admin_role = (
        db.query(Role)
        .filter(
            Role.name == "ORGANIZATION_ADMIN"
        )
        .first()
    )



    if not admin_role:


        admin_role = Role(

            name="ORGANIZATION_ADMIN",

            description="Tenant administrator"

        )


        db.add(admin_role)

        db.commit()

        db.refresh(admin_role)




    membership = UserRole(

        user_id=UUID(user_id),

        organization_id=organization.id,

        role_id=admin_role.id

    )


    db.add(membership)

    db.commit()



    return {

        "status": "created",

        "organization_id":
            str(organization.id),

        "organization_name":
            organization.name,

        "role":
            admin_role.name

    }





@router.get("/me")
def get_current_user_context(

    user_id: str,

    db: Session = Depends(get_db)

):


    membership = (

        db.query(UserRole)

        .filter(

            UserRole.user_id == UUID(user_id)

        )

        .first()

    )



    if not membership:


        raise HTTPException(

            status_code=403,

            detail="User has no organization"

        )



    return {


        "user_id":

            user_id,


        "organization_id":

            str(
                membership.organization_id
            ),



        "organization_name":

            membership.organization.name,



        "role":

            membership.role.name

    }
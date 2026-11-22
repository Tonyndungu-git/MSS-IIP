from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID

from app.database.connection import get_db
from app.models.organization import Organization
from app.models.iam import UserRole, Role
from fastapi import Header


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


    try:

        user_uuid = UUID(user_id)

    except ValueError:

        raise HTTPException(
            status_code=400,
            detail="Invalid user id"
        )



    organization_name = payload.get(
        "organization_name"
    )


    if not organization_name:

        raise HTTPException(
            status_code=400,
            detail="Organization name required"
        )



    #
    # Prevent user creating multiple tenants
    #

    existing_membership = (

        db.query(UserRole)

        .filter(
            UserRole.user_id == user_uuid
        )

        .first()

    )


    if existing_membership:

        raise HTTPException(

            status_code=400,

            detail="User already has an MSS organization"

        )



    #
    # Prevent duplicate organization names
    #

    existing_org = (

        db.query(Organization)

        .filter(
            Organization.name == organization_name
        )

        .first()

    )


    if existing_org:

        raise HTTPException(

            status_code=400,

            detail="Organization already exists"

        )



    try:


        #
        # Create organization
        #

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


        # Generate organization.id
        # without committing yet

        db.flush()



        #
        # Get or create admin role
        #

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


            db.flush()



        #
        # Create user organization membership
        #

        membership = UserRole(

            user_id=user_uuid,

            organization_id=organization.id,

            role_id=admin_role.id

        )


        db.add(membership)



        #
        # Commit everything together
        #

        db.commit()


        db.refresh(organization)



        return {


            "status": "created",


            "organization_id":

                str(organization.id),



            "organization_name":

                organization.name,



            "role":

                admin_role.name

        }



    except Exception as e:


        db.rollback()


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )





@router.get("/me")
def get_current_user_context(
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):

    if not authorization:

        raise HTTPException(
            status_code=401,
            detail="Missing authorization token"
        )


    if not authorization.startswith("Bearer "):

        raise HTTPException(
            status_code=401,
            detail="Invalid authorization header"
        )


    token = authorization.replace(
        "Bearer ",
        ""
    )


    #
    # Temporary:
    # Decode Supabase JWT later using JWKS
    #
    # For now get user id from token payload
    #

    import jwt

    try:

        payload = jwt.decode(
            token,
            options={
                "verify_signature": False
            }
        )


        user_id = payload.get(
            "sub"
        )


    except Exception:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )


    if not user_id:

        raise HTTPException(
            status_code=401,
            detail="No user identity found"
        )



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


    try:

        user_uuid = UUID(user_id)

    except ValueError:

        raise HTTPException(

            status_code=400,

            detail="Invalid user id"

        )



    membership = (

        db.query(UserRole)

        .filter(

            UserRole.user_id == user_uuid

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
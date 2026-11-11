from fastapi import HTTPException
from sqlalchemy.orm import Session
from uuid import UUID

from app.models.iam import UserRole, Role



def get_roles(db:Session):

    return db.query(Role).all()



def get_members(
    db:Session,
    organization_id
):

    users = (
        db.query(UserRole)
        .filter(
            UserRole.organization_id ==
            organization_id
        )
        .all()
    )


    return users




def assign_role(
    db:Session,
    user_id,
    organization_id,
    role_name
):


    role = (
        db.query(Role)
        .filter(
            Role.name == role_name
        )
        .first()
    )


    if not role:

        role = Role(
            name=role_name,
            description=f"{role_name} role"
        )

        db.add(role)

        db.commit()

        db.refresh(role)



    membership = UserRole(

        user_id=UUID(user_id),

        organization_id=
            UUID(organization_id),

        role_id=
            role.id
    )


    db.add(membership)

    db.commit()

    return membership




def remove_member(
    db:Session,
    user_id,
    organization_id
):

    member = (
        db.query(UserRole)
        .filter(
            UserRole.user_id ==
            UUID(user_id),

            UserRole.organization_id ==
            UUID(organization_id)
        )
        .first()
    )


    if not member:

        raise HTTPException(
            404,
            "User not found"
        )


    db.delete(member)

    db.commit()


    return {
        "status":"removed"
    }
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.auth.users import (
    get_members,
    assign_role,
    remove_member
)


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)



@router.get("/{organization_id}")
def list_users(
    organization_id:str,
    db:Session=Depends(get_db)
):

    members = get_members(
        db,
        organization_id
    )


    return [

        {
            "user_id":
                str(x.user_id),

            "organization_id":
                str(x.organization_id),

            "role":
                x.role.name

        }

        for x in members

    ]





@router.post("/assign")
def create_user_role(
    payload:dict,
    db:Session=Depends(get_db)
):


    return assign_role(
        db,
        payload["user_id"],
        payload["organization_id"],
        payload["role"]
    )





@router.delete("/remove")
def delete_user(
    payload:dict,
    db:Session=Depends(get_db)
):

    return remove_member(
        db,
        payload["user_id"],
        payload["organization_id"]
    )
from fastapi import HTTPException
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db



def check_org_access(
    user_org_id,
    resource_org_id
):

    if user_org_id != resource_org_id:

        raise HTTPException(
            status_code=403,
            detail="Organization access denied"
        )


def require_role(
    user_role,
    allowed_roles
):

    if user_role not in allowed_roles:

        raise HTTPException(
            status_code=403,
            detail="Insufficient permissions"
        )


def get_current_user(
    db: Session = Depends(get_db)
):

    # temporary until JWT authentication
    return {
        "id": "system",
        "role": "ADMIN",
        "organization_id": None
    }
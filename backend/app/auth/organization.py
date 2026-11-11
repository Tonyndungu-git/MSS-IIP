from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.auth.dependencies import current_user

from app.models.iam import UserRole



def current_organization(
    user = Depends(current_user),
    db: Session = Depends(get_db)
):


    membership = (
        db.query(UserRole)
        .filter(
            UserRole.user_id == user["id"]
        )
        .first()
    )


    if not membership:

        raise HTTPException(
            status_code=403,
            detail="No organization assigned"
        )


    return membership.organization_id
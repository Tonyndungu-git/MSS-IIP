from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer

from app.auth.jwt import decode_token


security = HTTPBearer()



def current_user(
    credentials = Depends(security)
):

    token = credentials.credentials


    payload = decode_token(token)


    user_id = payload.get(
        "sub"
    )


    if not user_id:

        raise HTTPException(
            status_code=401,
            detail="Invalid user"
        )


    return {
        "id": user_id,
        "email": payload.get("email")
    }
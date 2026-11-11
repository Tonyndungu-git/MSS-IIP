from jose import jwt, JWTError
from fastapi import HTTPException
import requests


SUPABASE_URL = "https://kbzltiikfdhknrgfsxan.supabase.co"


JWKS_URL = f"{SUPABASE_URL}/auth/v1/.well-known/jwks.json"


def decode_token(token: str):

    try:

        jwks = requests.get(
            JWKS_URL
        ).json()


        header = jwt.get_unverified_header(token)


        key = next(
            k for k in jwks["keys"]
            if k["kid"] == header["kid"]
        )


        payload = jwt.decode(
            token,
            key,
            algorithms=["ES256"],
            audience="authenticated"
        )


        return payload


    except Exception as e:

        print("JWT ERROR:", e)

        raise HTTPException(
            status_code=401,
            detail="Invalid authentication token"
        )
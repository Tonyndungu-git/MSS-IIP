from fastapi import APIRouter, Depends


router = APIRouter(
    prefix="/context",
    tags=["Context"]
)


@router.get("/")
def get_context():

    return {

        "organization":None,

        "sites":[],

        "assets":[],

        "permissions":[]

    }
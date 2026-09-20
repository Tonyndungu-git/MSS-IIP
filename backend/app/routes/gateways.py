from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.gateway import Gateway

from app.schemas.gateway import (
    GatewayCreate,
    GatewayResponse
)



router = APIRouter(
    prefix="/gateways",
    tags=["Gateways"]
)



@router.post(
"/",
response_model=GatewayResponse
)
def create_gateway(

gateway:GatewayCreate,

db:Session=Depends(get_db)

):


    new_gateway = Gateway(

        name=gateway.name,

        manufacturer=gateway.manufacturer,

        protocol=gateway.protocol,

        connection_type=gateway.connection_type,

        ip_address=gateway.ip_address,

        port=gateway.port,

        site_id=gateway.site_id

    )


    db.add(new_gateway)

    db.commit()

    db.refresh(new_gateway)


    return new_gateway
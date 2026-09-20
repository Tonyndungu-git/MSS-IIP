from uuid import UUID

from pydantic import BaseModel, ConfigDict

from typing import Optional



class GatewayCreate(BaseModel):

    name:str

    manufacturer:str

    protocol:str

    connection_type:str

    ip_address:Optional[str]=None

    port:Optional[int]=None

    site_id:UUID



class GatewayResponse(BaseModel):

    id:UUID

    name:str

    manufacturer:str

    protocol:str

    connection_type:str

    ip_address:Optional[str]

    port:Optional[int]

    status:str

    site_id:UUID


    model_config = ConfigDict(
        from_attributes=True
    )
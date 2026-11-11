from pydantic import BaseModel
from uuid import UUID


class CreateUserRequest(BaseModel):

    email: str

    password: str

    role: str = "OPERATOR"



class UserResponse(BaseModel):

    user_id: UUID

    email: str

    role: str

    organization_id: UUID
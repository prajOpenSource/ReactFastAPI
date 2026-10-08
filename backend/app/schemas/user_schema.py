from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    name: str
    role: str
    email: EmailStr


class UserUpdate(BaseModel):
    name: str
    role: str
    email: EmailStr


class UserResponse(BaseModel):
    id: int
    name: str
    role: str
    email: EmailStr

    model_config = {
        "from_attributes": True
    }
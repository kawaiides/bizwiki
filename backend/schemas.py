from pydantic import BaseModel, EmailStr

# --- Auth Schemas ---
class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# --- Chat Schemas ---
class QuestionRequest(BaseModel):
    question: str
    session_id: int | None = None
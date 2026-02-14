from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


# --- Auth Schemas ---
class UserRegister(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)
    display_name: Optional[str] = None


class UserLogin(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict


# --- Chat Schemas ---
class ChatInput(BaseModel):
    message: str = Field(..., min_length=1)


class ChatResponse(BaseModel):
    user_message: dict
    ai_response: dict


# --- Profile Schemas ---
class ProfileUpdate(BaseModel):
    display_name: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    voice_preference: Optional[str] = None
    theme_preference: Optional[str] = None
    current_mood: Optional[str] = None


class UserProfile(BaseModel):
    id: str
    username: str
    email: str
    display_name: Optional[str]
    avatar_url: Optional[str]
    bio: Optional[str]
    voice_preference: str
    theme_preference: str
    current_mood: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


# --- Emotion Log ---
class EmotionLogCreate(BaseModel):
    emotion: str
    intensity: float = Field(0.5, ge=0.0, le=1.0)
    note: Optional[str] = None


# --- Connection / Matching ---
class ConnectionRequest(BaseModel):
    target_user_id: str


class DirectMessageCreate(BaseModel):
    receiver_id: str
    content: str
    message_type: str = "text"

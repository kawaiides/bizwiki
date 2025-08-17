from fastapi import APIRouter
from . import auth, documents, chat

api_router = APIRouter()

# Include individual routers with prefixes and tags
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(documents.router, prefix="/documents", tags=["Document Management"])
api_router.include_router(chat.router, prefix="/chat", tags=["Conversational AI"])
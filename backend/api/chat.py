from fastapi import APIRouter
from schemas import QuestionRequest

router = APIRouter()

@router.post("/ask")
def ask_question(request: QuestionRequest):
    # Placeholder for the main RAG pipeline
    return {"answer": f"This is a placeholder answer to your question: '{request.question}'"}
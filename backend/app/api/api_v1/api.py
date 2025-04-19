from fastapi import APIRouter
from .endpoints import questions, departments, tags

api_router = APIRouter()

api_router.include_router(questions.router, prefix="/questions", tags=["questions"])
api_router.include_router(departments.router, prefix="/departments", tags=["departments"])
api_router.include_router(tags.router, prefix="/tags", tags=["tags"]) 
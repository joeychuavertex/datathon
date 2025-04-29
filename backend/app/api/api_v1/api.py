from fastapi import APIRouter
from .endpoints import questions, departments, tags, problem_constructor

api_router = APIRouter()

api_router.include_router(questions.router, prefix="/questions", tags=["questions"])
api_router.include_router(departments.router, prefix="/departments", tags=["departments"])
api_router.include_router(tags.router, prefix="/tags", tags=["tags"])
api_router.include_router(problem_constructor.router, prefix="/problem-constructor", tags=["problem-constructor"]) 
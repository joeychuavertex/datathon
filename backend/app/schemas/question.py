from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class TagBase(BaseModel):
    name: str
    snomed_concept_id: Optional[str] = None
    description: Optional[str] = None

class TagCreate(TagBase):
    pass

class Tag(TagBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class QuestionBase(BaseModel):
    title: str
    content: str
    analysis_summary: str
    slicer_dicer_query: Optional[str] = None
    department_id: int

class QuestionCreate(QuestionBase):
    pass

class QuestionUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    analysis_summary: Optional[str] = None
    slicer_dicer_query: Optional[str] = None
    department_id: Optional[int] = None

class QuestionResponse(QuestionBase):
    id: int
    screenshot_path: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    tags: List[Tag] = []

    class Config:
        from_attributes = True

class RelatedQuestionResponse(BaseModel):
    source_question_id: int
    target_question_id: int
    similarity_score: int
    relationship_type: str

    class Config:
        from_attributes = True 
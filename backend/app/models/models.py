from sqlalchemy import Column, Integer, String, Text, ForeignKey, Table
from sqlalchemy.orm import relationship
from .base import BaseModel, Base

# Association table for many-to-many relationship between questions and tags
question_tags = Table(
    'question_tags',
    Base.metadata,
    Column('question_id', Integer, ForeignKey('questions.id')),
    Column('tag_id', Integer, ForeignKey('tags.id'))
)

class Department(BaseModel):
    __tablename__ = "departments"

    name = Column(String(100), unique=True, index=True)
    description = Column(Text, nullable=True)
    questions = relationship("Question", back_populates="department")

class Question(BaseModel):
    __tablename__ = "questions"

    title = Column(String(200), index=True)
    content = Column(Text)
    analysis_summary = Column(Text)
    slicer_dicer_query = Column(Text, nullable=True)
    screenshot_path = Column(String(500), nullable=True)
    department_id = Column(Integer, ForeignKey('departments.id'))
    
    department = relationship("Department", back_populates="questions")
    tags = relationship("Tag", secondary=question_tags, back_populates="questions")

class Tag(BaseModel):
    __tablename__ = "tags"

    name = Column(String(100), unique=True, index=True)
    snomed_concept_id = Column(String(50), nullable=True, index=True)
    description = Column(Text, nullable=True)
    
    questions = relationship("Question", secondary=question_tags, back_populates="tags")

class RelatedQuestion(BaseModel):
    __tablename__ = "related_questions"

    source_question_id = Column(Integer, ForeignKey('questions.id'))
    target_question_id = Column(Integer, ForeignKey('questions.id'))
    similarity_score = Column(Integer)  # Score from 0-100
    relationship_type = Column(String(50))  # e.g., "shared_tags", "similar_content" 
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from ....db.session import get_db
from ....models.models import Question, Tag
from ....services.nlp import extract_clinical_concepts
from ....schemas.question import (
    QuestionCreate,
    QuestionUpdate,
    QuestionResponse,
    RelatedQuestionResponse
)

router = APIRouter()

@router.post("/", response_model=QuestionResponse)
async def create_question(
    question: QuestionCreate,
    db: Session = Depends(get_db)
):
    # Create new question
    db_question = Question(
        title=question.title,
        content=question.content,
        analysis_summary=question.analysis_summary,
        slicer_dicer_query=question.slicer_dicer_query,
        department_id=question.department_id
    )
    
    # Extract and create tags using NLP
    concepts = extract_clinical_concepts(question.content)
    for concept in concepts:
        # Check if tag exists
        tag = db.query(Tag).filter(Tag.snomed_concept_id == concept.id).first()
        if not tag:
            tag = Tag(
                name=concept.name,
                snomed_concept_id=concept.id,
                description=concept.description
            )
            db.add(tag)
        db_question.tags.append(tag)
    
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

@router.get("/{question_id}", response_model=QuestionResponse)
async def get_question(
    question_id: int,
    db: Session = Depends(get_db)
):
    question = db.query(Question).filter(Question.id == question_id).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    return question

@router.get("/", response_model=List[QuestionResponse])
async def list_questions(
    skip: int = 0,
    limit: int = 10,
    department_id: Optional[int] = None,
    tag_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Question)
    if department_id:
        query = query.filter(Question.department_id == department_id)
    if tag_id:
        query = query.filter(Question.tags.any(id=tag_id))
    
    questions = query.offset(skip).limit(limit).all()
    return questions

@router.put("/{question_id}", response_model=QuestionResponse)
async def update_question(
    question_id: int,
    question: QuestionUpdate,
    db: Session = Depends(get_db)
):
    db_question = db.query(Question).filter(Question.id == question_id).first()
    if not db_question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    for field, value in question.dict(exclude_unset=True).items():
        setattr(db_question, field, value)
    
    # Update tags if content changed
    if question.content:
        # Clear existing tags
        db_question.tags = []
        # Extract and create new tags
        concepts = extract_clinical_concepts(question.content)
        for concept in concepts:
            tag = db.query(Tag).filter(Tag.snomed_concept_id == concept.id).first()
            if not tag:
                tag = Tag(
                    name=concept.name,
                    snomed_concept_id=concept.id,
                    description=concept.description
                )
                db.add(tag)
            db_question.tags.append(tag)
    
    db.commit()
    db.refresh(db_question)
    return db_question

@router.post("/{question_id}/screenshot")
async def upload_screenshot(
    question_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    question = db.query(Question).filter(Question.id == question_id).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    # Save file and update screenshot path
    file_location = f"uploads/screenshots/{file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(await file.read())
    
    question.screenshot_path = file_location
    db.commit()
    return {"message": "Screenshot uploaded successfully"} 
from typing import List, NamedTuple
import spacy
from ..core.config import get_settings

settings = get_settings()

# Load the ScispaCy model
nlp = spacy.load("en_core_sci_lg")

class ClinicalConcept(NamedTuple):
    id: str
    name: str
    description: str

def extract_clinical_concepts(text: str) -> List[ClinicalConcept]:
    """
    Extract clinical concepts from text using ScispaCy.
    Returns a list of SNOMED CT concepts.
    """
    doc = nlp(text)
    concepts = []
    
    # Extract entities
    for ent in doc.ents:
        # For now, we're creating placeholder SNOMED CT IDs
        # In a production environment, you would use a proper SNOMED CT API
        concept = ClinicalConcept(
            id=f"SNOMED_{hash(ent.text) % 10000000}",  # Placeholder SNOMED ID
            name=ent.text,
            description=f"Entity type: {ent.label_}"
        )
        concepts.append(concept)
    
    return concepts

def calculate_similarity(text1: str, text2: str) -> float:
    """
    Calculate semantic similarity between two texts using ScispaCy.
    Returns a similarity score between 0 and 1.
    """
    doc1 = nlp(text1)
    doc2 = nlp(text2)
    return doc1.similarity(doc2)

def find_related_questions(target_text: str, question_texts: List[str], threshold: float = 0.5) -> List[tuple]:
    """
    Find related questions based on semantic similarity.
    Returns a list of tuples (question_index, similarity_score).
    """
    related = []
    target_doc = nlp(target_text)
    
    for i, text in enumerate(question_texts):
        doc = nlp(text)
        similarity = target_doc.similarity(doc)
        if similarity >= threshold:
            related.append((i, similarity))
    
    return sorted(related, key=lambda x: x[1], reverse=True) 
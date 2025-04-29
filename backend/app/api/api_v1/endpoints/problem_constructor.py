from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import openai
import logging
from app.core.config import get_settings

settings = get_settings()
openai.api_key = settings.OPENAI_API_KEY

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

class ProblemConstructorRequest(BaseModel):
    population: Optional[str] = None
    location: Optional[str] = None
    problem: Optional[str] = None
    evidence: Optional[str] = None
    consequences: Optional[str] = None
    factors: Optional[str] = None

@router.post("/generate")
async def generate_problem_statement(request: ProblemConstructorRequest):
    try:
        logger.info("Received request with data: %s", request.dict())
        
        # Build the prompt with available information
        prompt_parts = []
        
        if request.population:
            prompt_parts.append(f"Population/Process: {request.population}")
        if request.location:
            prompt_parts.append(f"Location/Setting: {request.location}")
        if request.problem:
            prompt_parts.append(f"Problem Description: {request.problem}")
        if request.evidence:
            prompt_parts.append(f"Evidence/Data: {request.evidence}")
        if request.consequences:
            prompt_parts.append(f"Negative Consequences: {request.consequences}")
        if request.factors:
            prompt_parts.append(f"Contributing Factors: {request.factors}")

        if not prompt_parts:
            logger.warning("No fields provided in the request")
            raise HTTPException(status_code=400, detail="At least one field must be provided")

        prompt = f"""Based on the following information, generate a well-structured problem statement for healthcare quality improvement:

{'\\n'.join(prompt_parts)}

Please format the response as a clear, concise problem statement. If certain information is missing, use appropriate placeholders or make reasonable assumptions based on the provided context."""

        logger.info("Sending request to OpenAI with prompt: %s", prompt)

        response = await openai.ChatCompletion.acreate(
            model=settings.OPENAI_MODEL,
            messages=[
                {"role": "system", "content": "You are a healthcare quality improvement expert helping to formulate clear problem statements. You can make reasonable assumptions when information is missing."},
                {"role": "user", "content": prompt}
            ],
            temperature=settings.OPENAI_TEMPERATURE,
            max_tokens=settings.OPENAI_MAX_TOKENS
        )

        result = response.choices[0].message.content.strip()
        logger.info("Successfully generated problem statement")
        return {"result": result}
    except openai.error.AuthenticationError as e:
        logger.error("OpenAI Authentication Error: %s", str(e))
        raise HTTPException(
            status_code=401,
            detail="OpenAI API authentication failed. Please check your API key."
        )
    except openai.error.APIError as e:
        logger.error("OpenAI API Error: %s", str(e))
        raise HTTPException(
            status_code=500,
            detail=f"OpenAI API error: {str(e)}"
        )
    except Exception as e:
        logger.error("Unexpected error: %s", str(e))
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        ) 
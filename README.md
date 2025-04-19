# Datathon Platform

A web-based platform for datathon that supports clinical question management and cross-departmental knowledge sharing using Epic's SlicerDicer.

## Features

- Store and search clinical questions and SlicerDicer analyses
- AI-powered clinical concept tagging using SNOMED CT
- Cross-departmental question recommendations
- Visualization of related clinical questions across departments

## Tech Stack

- Backend: FastAPI, SQLAlchemy, PostgreSQL
- Frontend: React, Tailwind CSS
- NLP: ScispaCy for biomedical text processing
- Clinical Ontology: SNOMED CT integration

## Setup

### Backend Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run the backend server:
```bash
cd backend
uvicorn main:app --reload
```

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Run the development server:
```bash
npm run dev
```

## Project Structure

```
healthcare-analytics/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   └── services/
│   └── main.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
├── requirements.txt
└── README.md
``` 
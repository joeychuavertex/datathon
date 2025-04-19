export interface Tag {
  id: number;
  name: string;
  snomed_concept_id?: string;
  description?: string;
  created_at: string;
  updated_at: string;
  severity: number;
}

export interface Department {
  id: number;
  name: string;
  description?: string;
  questionCount?: number;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: number;
  title: string;
  content: string;
  analysis_summary: string;
  slicer_dicer_query?: string;
  screenshot_path?: string;
  department_id: number;
  department?: Department;
  tags: Tag[];
  created_at: string;
  updated_at: string;
}

export interface QuestionCreate {
  title: string;
  content: string;
  analysis_summary: string;
  slicer_dicer_query?: string;
  department_id: number;
}

export interface QuestionUpdate {
  title?: string;
  content?: string;
  analysis_summary?: string;
  slicer_dicer_query?: string;
  department_id?: number;
} 
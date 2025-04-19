import axios, { AxiosError } from 'axios';
import { Question, QuestionCreate, QuestionUpdate, Department } from '../types';

const API_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handling helper
const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.response?.data?.message || axiosError.message);
  }
  throw error;
};

// Questions
export const fetchQuestions = async (): Promise<Question[]> => {
  try {
    const response = await api.get<Question[]>('/questions');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchQuestion = async (id: number): Promise<Question> => {
  try {
    const response = await api.get<Question>(`/questions/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createQuestion = async (question: QuestionCreate): Promise<Question> => {
  try {
    const response = await api.post<Question>('/questions', question);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateQuestion = async (id: number, question: QuestionUpdate): Promise<Question> => {
  try {
    const response = await api.put<Question>(`/questions/${id}`, question);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const uploadScreenshot = async (questionId: number, file: File): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    await api.post(`/questions/${questionId}/screenshot`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    throw handleApiError(error);
  }
};

// Departments
export const fetchDepartments = async (): Promise<Department[]> => {
  try {
    const response = await api.get<Department[]>('/departments');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchDepartment = async (id: number): Promise<Department> => {
  try {
    const response = await api.get<Department>(`/departments/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}; 
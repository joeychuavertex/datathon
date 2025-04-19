import axios from 'axios';
import { Question, QuestionCreate, QuestionUpdate, Department } from '../types';

const API_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Questions
export const fetchQuestions = async (): Promise<Question[]> => {
  const response = await api.get('/questions');
  return response.data;
};

export const fetchQuestion = async (id: number): Promise<Question> => {
  const response = await api.get(`/questions/${id}`);
  return response.data;
};

export const createQuestion = async (question: QuestionCreate): Promise<Question> => {
  const response = await api.post('/questions', question);
  return response.data;
};

export const updateQuestion = async (id: number, question: QuestionUpdate): Promise<Question> => {
  const response = await api.put(`/questions/${id}`, question);
  return response.data;
};

export const uploadScreenshot = async (questionId: number, file: File): Promise<void> => {
  const formData = new FormData();
  formData.append('file', file);
  await api.post(`/questions/${questionId}/screenshot`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Departments
export const fetchDepartments = async (): Promise<Department[]> => {
  const response = await api.get('/departments');
  return response.data;
};

export const fetchDepartment = async (id: number): Promise<Department> => {
  const response = await api.get(`/departments/${id}`);
  return response.data;
}; 
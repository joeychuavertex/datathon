import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { createQuestion, fetchDepartments } from '../services/api';
import { QuestionCreate, Department } from '../types';

const QuestionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<QuestionCreate>({
    title: '',
    content: '',
    analysis_summary: '',
    slicer_dicer_query: '',
    department_id: 0,
  });

  const { data: departments } = useQuery<Department[]>({
    queryKey: ['departments'],
    queryFn: fetchDepartments,
  });

  const createQuestionMutation = useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'Question created successfully',
        color: 'green',
      });
      navigate('/');
    },
    onError: () => {
      notifications.show({
        title: 'Error',
        message: 'Failed to create question',
        color: 'red',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createQuestionMutation.mutate(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'department_id' ? parseInt(value) : value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">New Clinical Question</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input"
            placeholder="Enter the clinical question title"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Question Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={4}
            className="input"
            placeholder="Describe your clinical question in detail"
          />
        </div>

        <div>
          <label htmlFor="analysis_summary" className="block text-sm font-medium text-gray-700 mb-1">
            Analysis Summary
          </label>
          <textarea
            id="analysis_summary"
            name="analysis_summary"
            value={formData.analysis_summary}
            onChange={handleChange}
            required
            rows={4}
            className="input"
            placeholder="Summarize your SlicerDicer analysis findings"
          />
        </div>

        <div>
          <label htmlFor="slicer_dicer_query" className="block text-sm font-medium text-gray-700 mb-1">
            SlicerDicer Query
          </label>
          <textarea
            id="slicer_dicer_query"
            name="slicer_dicer_query"
            value={formData.slicer_dicer_query}
            onChange={handleChange}
            rows={3}
            className="input"
            placeholder="(Optional) Include your SlicerDicer query configuration"
          />
        </div>

        <div>
          <label htmlFor="department_id" className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <select
            id="department_id"
            name="department_id"
            value={formData.department_id}
            onChange={handleChange}
            required
            className="input"
          >
            <option value="">Select a department</option>
            {departments?.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={createQuestionMutation.isLoading}
          >
            {createQuestionMutation.isLoading ? 'Creating...' : 'Create Question'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm; 
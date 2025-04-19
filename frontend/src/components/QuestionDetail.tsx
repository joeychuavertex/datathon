import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { Badge, Group, Text, Title, Image, Textarea, Card, Stack, Paper } from '@mantine/core';
import { fetchQuestion, updateQuestion, uploadScreenshot } from '../services/api';
import { Question } from '../types';

const QuestionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const questionId = parseInt(id || '0');

  const { data: question, isLoading, error } = useQuery<Question>({
    queryKey: ['question', questionId],
    queryFn: () => fetchQuestion(questionId),
  });

  const updateQuestionMutation = useMutation({
    mutationFn: (data: Partial<Question>) => updateQuestion(questionId, data),
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'Question updated successfully',
        color: 'green',
      });
      queryClient.invalidateQueries({ queryKey: ['question', questionId] });
    },
    onError: () => {
      notifications.show({
        title: 'Error',
        message: 'Failed to update question',
        color: 'red',
      });
    },
  });

  const handleScreenshotUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (isNaN(questionId)) {
      notifications.show({
        title: 'Error',
        message: 'Invalid question ID',
        color: 'red',
      });
      return;
    }

    try {
      await uploadScreenshot(questionId, file);
      queryClient.invalidateQueries({ queryKey: ['question', questionId] });
      notifications.show({
        title: 'Success',
        message: 'Screenshot uploaded successfully',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to upload screenshot',
        color: 'red',
      });
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading question...</div>;
  }

  if (error || !question) {
    return <div className="text-red-600">Error loading question</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Title order={1} className="text-2xl font-bold text-gray-800">
          {question.title}
        </Title>
        <Group>
          <input
            type="file"
            accept="image/*"
            onChange={handleScreenshotUpload}
            className="hidden"
            id="screenshot-upload"
          />
          <label
            htmlFor="screenshot-upload"
            className="btn btn-secondary cursor-pointer"
          >
            Upload Screenshot
          </label>
        </Group>
      </div>

      <div className="card mb-6">
        <Text size="lg" className="mb-4">
          {question.content}
        </Text>
        <div className="flex gap-2 mb-4">
          {question.tags.map((tag) => (
            <Badge key={tag.id} color="blue">
              {tag.name}
            </Badge>
          ))}
        </div>
        <Text size="sm" color="dimmed">
          Department: {question.department?.name}
        </Text>
      </div>

      <div className="card mb-6">
        <Title order={2} className="text-xl font-semibold mb-4">
          Analysis Summary
        </Title>
        <Textarea
          value={question.analysis_summary}
          onChange={(e) =>
            updateQuestionMutation.mutate({ analysis_summary: e.target.value })
          }
          minRows={4}
          className="mb-4"
        />
      </div>

      {question.slicer_dicer_query && (
        <div className="card mb-6">
          <Title order={2} className="text-xl font-semibold mb-4">
            SlicerDicer Query
          </Title>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            {question.slicer_dicer_query}
          </pre>
        </div>
      )}

      {question.screenshot_path && (
        <div className="card">
          <Title order={2} className="text-xl font-semibold mb-4">
            SlicerDicer Screenshot
          </Title>
          <Image
            src={question.screenshot_path}
            alt="SlicerDicer Analysis"
            className="rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default QuestionDetail; 
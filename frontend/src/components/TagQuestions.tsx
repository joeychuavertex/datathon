import { useParams, Link } from 'react-router-dom';
import { Card, Title, Text, Badge, Group, Stack } from '@mantine/core';
import Plot from 'react-plotly.js';
import { mockQuestions } from '../mockData/departments';
import { Question } from '../types';
import { Data, Layout } from 'plotly.js';

interface ChartData {
  data: Data[];
  layout: Partial<Layout>;
}

// Helper function to generate mock data based on query type
const generateChartData = (question: Question): ChartData | null => {
  switch (question.title) {
    case 'Trend Analysis of HbA1c Levels in Diabetic Patients':
      return {
        data: [{
          x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          y: [7.2, 7.0, 6.8, 6.9, 6.7, 6.5],
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Average HbA1c',
          line: { color: '#4CAF50' }
        }],
        layout: {
          title: 'HbA1c Trend Analysis',
          xaxis: { title: 'Month' },
          yaxis: { title: 'HbA1c Level (%)' }
        }
      };
    // ... existing code ...
    default:
      return null;
  }
};

const TagQuestions = () => {
  const { tagId } = useParams<{ tagId: string }>();
  const tagIdNum = parseInt(tagId || '0');

  // Find all unique tags from all questions
  const allTags = new Map<number, Tag>();
  mockQuestions.forEach(question => {
    question.tags.forEach(tag => {
      if (!allTags.has(tag.id)) {
        allTags.set(tag.id, tag);
      }
    });
  });

  // Get the current tag
  const tag = allTags.get(tagIdNum);

  // Find questions that have this tag
  const tagQuestions = mockQuestions.filter(question => 
    question.tags.some(t => t.id === tagIdNum)
  );

  if (!tag) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Title order={1} className="text-2xl font-bold text-gray-800">
          Tag not found
        </Title>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <Title order={1} className="text-2xl font-bold text-gray-800">
          Questions tagged with "{tag.name}"
        </Title>
        <Text size="sm" color="dimmed" mt={2}>
          {tag.description}
        </Text>
      </div>

      <div className="grid gap-6">
        {tagQuestions.map((question) => {
          const chartData = generateChartData(question);
          return (
            <Card key={question.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Stack spacing="md">
                <Group position="apart">
                  <Title order={2} className="text-xl font-semibold">
                    {question.title}
                  </Title>
                  {question.department && (
                    <Badge color="blue" size="lg">
                      {question.department.name}
                    </Badge>
                  )}
                </Group>

                <Text size="md" color="dimmed">
                  {question.content}
                </Text>

                <div>
                  <Text size="sm" weight={500} className="mb-2">
                    Analysis Summary:
                  </Text>
                  <Text size="sm" color="dimmed">
                    {question.analysis_summary}
                  </Text>
                </div>

                {chartData && (
                  <div className="mt-4">
                    <Text size="sm" weight={500} className="mb-2">
                      SlicerDicer Analysis:
                    </Text>
                    <div className="w-full h-64">
                      <Plot
                        data={chartData.data}
                        layout={{
                          ...chartData.layout,
                          autosize: true,
                          margin: { l: 50, r: 50, t: 50, b: 50 }
                        }}
                        useResizeHandler={true}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                  </div>
                )}

                <Group spacing="xs">
                  {question.tags.map((t) => (
                    <Link 
                      key={t.id} 
                      to={`/tags/${t.id}`}
                      className="no-underline"
                    >
                      <Badge 
                        variant="outline"
                        color={t.id === tagIdNum ? "blue" : "gray"}
                        title={t.description}
                        className="hover:bg-gray-100 transition-colors"
                      >
                        {t.name}
                      </Badge>
                    </Link>
                  ))}
                </Group>
              </Stack>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TagQuestions; 
import { Link } from 'react-router-dom';
import { Card, Title, Text, Badge, Group, Stack } from '@mantine/core';
import { mockQuestions } from '../mockData/departments';

const Questions = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <Title order={1} className="text-2xl font-bold text-gray-800 mb-6">
        Clinical Questions
      </Title>

      <div className="grid gap-6">
        {mockQuestions.map((question) => (
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

              <Group spacing="xs">
                {question.tags.map((tag) => (
                  <Badge 
                    key={tag.id} 
                    variant="outline"
                    color="gray"
                    title={tag.description}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </Group>

              <Group position="apart" className="mt-2">
                <Text size="sm" color="dimmed">
                  Created: {new Date(question.created_at).toLocaleDateString()}
                </Text>
                {/* <Link
                  to={`/questions/${question.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Details →
                </Link> */}
              </Group>
            </Stack>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Questions; 
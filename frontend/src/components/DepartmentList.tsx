import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, Title, Text, Badge, Group } from '@mantine/core';
import { fetchDepartments } from '../services/api';
import { Department } from '../types';

const DepartmentList = () => {
  const { data: departments, isLoading, error } = useQuery<Department[]>({
    queryKey: ['departments'],
    queryFn: fetchDepartments,
  });

  if (isLoading) {
    return <div className="text-center">Loading departments...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error loading departments</div>;
  }

  return (
    <div>
      <Title order={1} className="text-2xl font-bold text-gray-800 mb-6">
        Departments
      </Title>

      <div className="grid gap-6">
        {departments?.map((department) => (
          <Card key={department.id} shadow="sm" padding="lg" radius="md">
            <Group position="apart" mb="xs">
              <Title order={2} className="text-xl font-semibold">
                {department.name}
              </Title>
              <Badge color="blue" size="lg">
                {department.questionCount || 0} Questions
              </Badge>
            </Group>

            {department.description && (
              <Text size="sm" color="dimmed" mb="md">
                {department.description}
              </Text>
            )}

            <Link
              to={`/departments/${department.id}`}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              View Questions →
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DepartmentList; 
import { useState } from 'react';
import { TextInput, Textarea, Button, Card, Title, Stack, Text, Select } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import PastProblems from './PastProblems';

interface ProblemConstructorForm {
  population?: string;
  location?: string;
  problem?: string;
  evidence?: string;
  consequences?: string;
  factors?: string;
}

const ProblemConstructor = () => {
  const [activeTab, setActiveTab] = useState<string>('create');
  const [formData, setFormData] = useState<ProblemConstructorForm>({
    population: '',
    location: '',
    problem: '',
    evidence: '',
    consequences: '',
    factors: '',
  });
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof ProblemConstructorForm) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    try {
      const response = await fetch('/api/v1/problem-constructor/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to generate problem statement');
      }

      setResult(data.result);
    } catch (error) {
      console.error('Error:', error);
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to generate problem statement. Please try again.',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <Title order={2}>Problem Statement Constructor</Title>
        <Select
          value={activeTab}
          onChange={(value) => setActiveTab(value || 'create')}
          data={[
            { value: 'create', label: 'Create New Problem' },
            { value: 'view', label: 'View Past Problems' },
          ]}
          className="w-48"
        />
      </div>

      {activeTab === 'create' ? (
        <>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <form onSubmit={handleSubmit}>
              <Stack spacing="md">
                <TextInput
                  label="Population/Process"
                  placeholder="e.g., Patients in the emergency department"
                  value={formData.population}
                  onChange={handleInputChange('population')}
                />
                
                <TextInput
                  label="Location/Setting"
                  placeholder="e.g., City General Hospital"
                  value={formData.location}
                  onChange={handleInputChange('location')}
                />
                
                <Textarea
                  label="Problem Description"
                  placeholder="Describe the problem in detail"
                  value={formData.problem}
                  onChange={handleInputChange('problem')}
                />
                
                <Textarea
                  label="Specific Measurable Data/Observation"
                  placeholder="Provide specific data or observations that evidence the problem"
                  value={formData.evidence}
                  onChange={handleInputChange('evidence')}
                />
                
                <Textarea
                  label="Negative Consequences"
                  placeholder="Describe the negative consequences of this problem"
                  value={formData.consequences}
                  onChange={handleInputChange('consequences')}
                />
                
                <Textarea
                  label="Potential Contributing Factors"
                  placeholder="List potential factors contributing to the problem"
                  value={formData.factors}
                  onChange={handleInputChange('factors')}
                />
                
                <Button type="submit" loading={loading}>
                  Generate Problem Statement
                </Button>
              </Stack>
            </form>
          </Card>

          {result && (
            <Card shadow="sm" padding="lg" radius="md" withBorder className="mt-6">
              <Title order={3} className="mb-4">Generated Problem Statement</Title>
              <Text>{result}</Text>
            </Card>
          )}
        </>
      ) : (
        <PastProblems />
      )}
    </div>
  );
};

export default ProblemConstructor; 
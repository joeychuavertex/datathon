import { useState } from 'react';
import { TextInput, Textarea, Button, Card, Title, Stack, Text, Select } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import PastProblems from './PastProblems';
import OpenAI from 'openai';

interface ProblemConstructorForm {
  population?: string;
  location?: string;
  problem?: string;
  evidence?: string;
  consequences?: string;
  factors?: string;
  apiKey?: string;
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
    apiKey: '',
  });
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof ProblemConstructorForm) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const highlightBracketedText = (text: string) => {
    const parts = text.split(/(\[.*?\])/g);
    return parts.map((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        return (
          <span key={index} style={{ backgroundColor: '#E6F3FF', padding: '0 2px', borderRadius: '2px' }}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    if (!formData.apiKey) {
      notifications.show({
        title: 'Error',
        message: 'Please enter your OpenAI API key',
        color: 'red',
      });
      setLoading(false);
      return;
    }

    try {
      const openai = new OpenAI({
        apiKey: formData.apiKey,
        dangerouslyAllowBrowser: true
      });

      const prompt = `Create a detailed, clinical problem statement using the following information. Follow this exact format and style:

"The [specific patient population with relevant characteristics] at [specific hospital/location with ward/unit details] are experiencing [specific clinical problem or deviation from guidelines/standards] as evidenced by [specific quantitative data, audit results, or measurable observations that demonstrate the problem]. This is contributing to [specific clinical and operational consequences with measurable impacts] and is likely influenced by [specific systemic, process, or knowledge-based factors that contribute to the problem]."

Here is the information to use:

Population/Process: ${formData.population}

Location/Setting: ${formData.location}

Problem Description: ${formData.problem}

Evidence/Data: ${formData.evidence}

Consequences: ${formData.consequences}

Contributing Factors: ${formData.factors}

Requirements for the generated statement:
1. Use exact square brackets [] around each key element
2. Include specific quantitative data and measurements where available
3. Reference specific guidelines, standards, or protocols when relevant
4. Use precise clinical terminology
5. Maintain a formal, academic tone
6. Ensure each section flows logically into the next
7. Include specific ward/unit details in the location
8. Specify exact percentages, rates, or other measurable data in the evidence section
9. List concrete, specific consequences with measurable impacts
10. Identify specific, actionable contributing factors

Example of expected output format:
"The [Adult medical inpatients with identified risk factors for VTE] at [Changi General Hospital, Medical Wards] are experiencing [inconsistent prescription and administration of pharmacological and mechanical VTE prophylaxis as recommended by the MOH Clinical Practice Guidelines on VTE Prevention] as evidenced by [a recent audit showing only 70% of eligible patients receiving appropriate prophylaxis within 24 hours of admission, falling short of the guideline's target of >95%]. This is contributing to [an increased risk of deep vein thrombosis and pulmonary embolism, potentially leading to significant morbidity and mortality, and increased length of stay and healthcare costs] and is likely influenced by [incomplete VTE risk assessments upon admission, lack of standardized order sets within the electronic health record, and insufficient awareness among junior doctors regarding the specific risk stratification and prophylaxis recommendations in the national guidelines]."`;

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o",
      });

      setResult(completion.choices[0].message.content || '');
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
    <div className="mx-auto p-4">
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
                  label="OpenAI API Key"
                  placeholder="Enter your OpenAI API key"
                  type="password"
                  value={formData.apiKey}
                  onChange={handleInputChange('apiKey')}
                  required
                />
                
                <TextInput
                  label="Population/Process"
                  placeholder="e.g., Patients in the emergency department"
                  value={formData.population}
                  onChange={handleInputChange('population')}
                />
                
                <TextInput
                  label="Location/Setting"
                  placeholder="e.g., National University Hospital"
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
              <Text style={{ whiteSpace: 'pre-line' }}>{highlightBracketedText(result)}</Text>
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
import { useState } from 'react';
import { TextInput, Textarea, Button, Card, Title, Stack, Text, Select } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import PastProblems from './PastProblems';
import OpenAI from 'openai';

interface GeneratedContent {
  analysis: {
    components: Array<{
      component: string;
      status: string;
      importance: string;
      suggestion?: string;
      example?: string;
      summary?: string;
      details?: string;
    }>;
    suggestedImprovements: string;
  };
  problemStatement: string;
  dataFramework: {
    dataPoints: string;
    population: string;
    dataSources: string;
    collectionMethods: string;
    frequency: string;
    granularity: string;
    qualityAssurance: string;
    analysisApproach: string;
  };
}

const ProblemConstructor = () => {
  const [activeTab, setActiveTab] = useState<string>('create');
  const [prompt, setPrompt] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [result, setResult] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState(false);

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
    setResult(null);

    if (!apiKey) {
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
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });

      const systemPrompt = `You are a healthcare data analyst specializing in Singapore's healthcare system. Analyze the user's input and provide:

1. Analysis of Components:
First, analyze the user's input and identify which key components are present and which are missing. The required components are:
- Population/Process (specific patient group)
- Location/Setting (specific hospital/ward)
- Problem Description (specific clinical issue)
- Evidence/Data (quantitative measures)
- Consequences (measurable impacts)
- Contributing Factors (actionable causes)

For each component, provide:
- Whether it is present or missing
- Why it's important
- If missing: Suggested information to include and example
- If present: Summary of the provided information

2. Suggested Problem Statement:
Based on the analysis, generate a complete problem statement following this format:
"The [specific patient population with relevant characteristics] at [specific hospital/location with ward/unit details] are experiencing [specific clinical problem or deviation from guidelines/standards] as evidenced by [specific quantitative data, audit results, or measurable observations that demonstrate the problem]. This is contributing to [specific clinical and operational consequences with measurable impacts] and is likely influenced by [specific systemic, process, or knowledge-based factors that contribute to the problem]."

3. A comprehensive data framework specifically tailored to Singapore's healthcare context. Each component must contain complete, detailed answers. Here's an example of the expected format:

{
  "analysis": {
    "components": [
      {
        "component": "Location/Setting",
        "status": "missing",
        "importance": "Helps identify the specific context and scope of the problem",
        "suggestion": "Include specific hospital name, ward number, and department",
        "example": "Singapore General Hospital, Ward 5A, Orthopaedic Department"
      },
      {
        "component": "Population/Process",
        "status": "present",
        "importance": "Defines the target group for analysis",
        "summary": "Adult inpatients at high risk of pressure ulcers",
        "details": "The input clearly specifies the target population as adult inpatients with Braden Scale score ≤18"
      }
    ],
    "suggestedImprovements": "Consider adding specific location details and quantitative evidence to strengthen the problem statement."
  },
  "problemStatement": "The [Adult inpatients at high risk of pressure ulcers] at [Singapore General Hospital, Ward 5A] are experiencing...",
  "dataFramework": {
    "dataPoints": "1. Patient demographics (age, gender, ethnicity)\n2. Clinical risk factors (mobility status, nutrition scores)\n3. Pressure ulcer incidence rates\n4. Nursing interventions documentation\n5. Patient outcomes and length of stay",
    "population": "1. All adult inpatients (≥18 years) admitted to Ward 5A\n2. Patients with Braden Scale score ≤18\n3. Patients with expected length of stay >48 hours\n4. Excluding palliative care patients",
    "dataSources": "1. National Electronic Health Record (NEHR)\n2. Hospital's Electronic Medical Record (EMR)\n3. Nursing documentation system\n4. Incident reporting system\n5. Patient satisfaction surveys",
    "collectionMethods": "1. Automated extraction from EMR systems\n2. Manual chart review for nursing documentation\n3. Daily ward rounds documentation\n4. Weekly incident report review\n5. Monthly patient satisfaction survey analysis",
    "frequency": "1. Real-time: Nursing interventions documentation\n2. Daily: Pressure ulcer risk assessment\n3. Weekly: Incidence rate calculation\n4. Monthly: Comprehensive data analysis\n5. Quarterly: Trend analysis and reporting",
    "granularity": "1. Patient-level data for all metrics\n2. Hourly documentation for nursing interventions\n3. Daily aggregation for risk assessments\n4. Weekly summaries for incidence rates\n5. Monthly reports for management review",
    "qualityAssurance": "1. Automated validation checks in EMR\n2. Daily nursing supervisor review\n3. Weekly data quality audits\n4. Monthly cross-validation with incident reports\n5. Quarterly data quality improvement initiatives",
    "analysisApproach": "1. Descriptive statistics for baseline characteristics\n2. Time-series analysis for trend identification\n3. Risk factor analysis using logistic regression\n4. Process mapping for intervention effectiveness\n5. Cost-benefit analysis of prevention measures"
  }
}

Format the response as a JSON object with three keys: "analysis", "problemStatement", and "dataFramework". The analysis should identify missing components and provide suggestions for improvement.`;

      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        model: "gpt-4o",
        response_format: { type: "json_object" }
      });

      const content = completion.choices[0].message.content;
      if (content) {
        setResult(JSON.parse(content));
      }
    } catch (error) {
      console.error('Error:', error);
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to generate content. Please try again.',
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
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  required
                />
                
                <Textarea
                  label="Describe Your Problem"
                  placeholder="e.g., In the last 6 months, in orthopaedic department, I want to look at patients that had undergone colon surgery and are above 60 years old and understand their length of stay."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  minRows={4}
                  required
                />
                
                <Button type="submit" loading={loading}>
                  Generate Problem Statement & Data Framework
                </Button>
              </Stack>
            </form>
          </Card>

          {result && (
            <>
              <Card shadow="sm" padding="lg" radius="md" withBorder className="mt-6">
                <Title order={3} className="mb-4">Analysis of Components</Title>
                <Stack spacing="md">
                  {result.analysis.components.map((item, index) => (
                    <div key={index}>
                      <Text weight={500} color={item.status === "missing" ? "red" : "green"}>
                        {item.component}: {item.status === "missing" ? "Missing" : "Present"}
                      </Text>
                      <Text size="sm" color="dimmed">Importance: {item.importance}</Text>
                      {item.status === "missing" && (
                        <>
                          <Text size="sm">Suggestion: {item.suggestion}</Text>
                          <Text size="sm">Example: {item.example}</Text>
                        </>
                      )}
                      {item.status === "present" && (
                        <Text size="sm">Summary: {item.summary}</Text>
                      )}
                      {item.status === "present" && (
                        <Text size="sm">Details: {item.details}</Text>
                      )}
                    </div>
                  ))}
                  <Text weight={500} className="mt-4">Suggested Improvements:</Text>
                  <Text>{result.analysis.suggestedImprovements}</Text>
                </Stack>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder className="mt-6">
                <Title order={3} className="mb-4">Suggested Problem Statement</Title>
                <Text style={{ whiteSpace: 'pre-line' }}>{highlightBracketedText(result.problemStatement)}</Text>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder className="mt-6">
                <Title order={3} className="mb-4">Data Framework</Title>
                <Stack spacing="md">
                  <div>
                    <Text weight={500}>Data Points to Collect:</Text>
                    <Text>{result.dataFramework.dataPoints}</Text>
                  </div>
                  <div>
                    <Text weight={500}>Population/Process Characteristics:</Text>
                    <Text>{result.dataFramework.population}</Text>
                  </div>
                  <div>
                    <Text weight={500}>Data Sources:</Text>
                    <Text>{result.dataFramework.dataSources}</Text>
                  </div>
                  <div>
                    <Text weight={500}>Collection Methods:</Text>
                    <Text>{result.dataFramework.collectionMethods}</Text>
                  </div>
                  <div>
                    <Text weight={500}>Collection Frequency:</Text>
                    <Text>{result.dataFramework.frequency}</Text>
                  </div>
                  <div>
                    <Text weight={500}>Required Granularity:</Text>
                    <Text>{result.dataFramework.granularity}</Text>
                  </div>
                  <div>
                    <Text weight={500}>Quality Assurance:</Text>
                    <Text>{result.dataFramework.qualityAssurance}</Text>
                  </div>
                  <div>
                    <Text weight={500}>Analysis Approach:</Text>
                    <Text>{result.dataFramework.analysisApproach}</Text>
                  </div>
                </Stack>
              </Card>
            </>
          )}
        </>
      ) : (
        <PastProblems />
      )}
    </div>
  );
};

export default ProblemConstructor; 
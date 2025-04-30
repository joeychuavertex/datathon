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
  evidenceAndResearch: {
    evidence: Array<{
      title: string;
      source: string;
      keyFindings: string;
      relevance: string;
    }>;
    qualityImprovementProjects: Array<{
      projectName: string;
      institution: string;
      interventions: string;
      outcomes: string;
      lessonsLearned: string;
    }>;
    researchGaps: Array<{
      area: string;
      currentStatus: string;
      potentialImpact: string;
    }>;
    summary: string;
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

3. A comprehensive data framework specifically tailored to Singapore's healthcare context.

4. Evidence and Research Analysis:
Provide a comprehensive analysis of:

a) Relevant Evidence:
- List key studies, guidelines, and best practices, focusing on:
  * Singapore Ministry of Health (MOH) guidelines and policies
  * Local hospital protocols and standards
  * International guidelines adapted for Singapore context
  * Recent research from Singapore healthcare institutions
  * Regional (ASEAN) healthcare practices
- For each piece of evidence, include:
  * Title and source (e.g., "MOH Clinical Practice Guidelines 2023", "Singapore Medical Journal 2022")
  * Key findings with specific metrics or outcomes
  * Direct relevance to the problem statement
  * Applicability to Singapore healthcare setting

Example evidence entry:
{
  "title": "MOH Clinical Practice Guidelines for Pressure Ulcer Prevention",
  "source": "Ministry of Health Singapore, 2023",
  "keyFindings": "Implementation of standardized risk assessment reduced pressure ulcer incidence by 45% in local hospitals",
  "relevance": "Directly applicable to improving pressure ulcer prevention in Singapore healthcare settings"
}

b) Quality Improvement Projects:
- Focus on projects from Singapore healthcare institutions:
  * Public hospitals (e.g., SGH, NUH, TTSH)
  * Community hospitals
  * Polyclinics
  * Private healthcare providers
- Include details about:
  * Project objectives and scope
  * Specific interventions implemented
  * Measurable outcomes and results
  * Challenges faced and solutions
  * Sustainability of improvements

Example QI project entry:
{
  "projectName": "Reducing Medication Errors in Ward 5A",
  "institution": "Singapore General Hospital",
  "interventions": "Implemented barcode scanning system, staff training, and double-checking protocol",
  "outcomes": "Reduced medication errors by 60% over 6 months",
  "lessonsLearned": "Importance of staff engagement and continuous monitoring"
}

c) Research Gaps:
- Identify specific areas needing further research in Singapore context:
  * Clinical outcomes and effectiveness
  * Cost-effectiveness and resource utilization
  * Patient experience and satisfaction
  * Implementation challenges
  * Cultural and social factors
- For each gap, specify:
  * Current state of knowledge
  * Why this gap matters
  * Potential impact of addressing it
  * Suggested research approaches

Example research gap entry:
{
  "area": "Impact of cultural factors on medication adherence",
  "currentStatus": "Limited local studies on cultural influences in medication adherence",
  "potentialImpact": "Could improve medication adherence rates by 20-30% in multi-ethnic population"
}

d) Summary:
- Provide a concise overview that:
  * Synthesizes key findings from evidence
  * Highlights successful QI approaches
  * Identifies priority research areas
  * Suggests actionable next steps
  * Emphasizes Singapore-specific considerations

Format your response as a valid JSON object with the following structure:

{
  "analysis": {
    "components": [
      {
        "component": "string",
        "status": "present" or "missing",
        "importance": "string",
        "suggestion": "string (if status is missing)",
        "example": "string (if status is missing)",
        "summary": "string (if status is present)",
        "details": "string (if status is present)"
      }
    ],
    "suggestedImprovements": "string"
  },
  "problemStatement": "string",
  "dataFramework": {
    "dataPoints": "string",
    "population": "string",
    "dataSources": "string",
    "collectionMethods": "string",
    "frequency": "string",
    "granularity": "string",
    "qualityAssurance": "string",
    "analysisApproach": "string"
  },
  "evidenceAndResearch": {
    "evidence": [
      {
        "title": "string",
        "source": "string",
        "keyFindings": "string",
        "relevance": "string"
      }
    ],
    "qualityImprovementProjects": [
      {
        "projectName": "string",
        "institution": "string",
        "interventions": "string",
        "outcomes": "string",
        "lessonsLearned": "string"
      }
    ],
    "researchGaps": [
      {
        "area": "string",
        "currentStatus": "string",
        "potentialImpact": "string"
      }
    ],
    "summary": "string"
  }
}

Your response must be a valid JSON object with all the fields shown above. Do not include any text before or after the JSON object. Use the detailed instructions above to generate rich, contextual content for each field.`;

      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        model: "gpt-4"
      });

      const content = completion.choices[0].message.content;
      if (content) {
        try {
          // Log the raw content for debugging
          console.log('Raw API response:', content);
          
          // Clean the content to ensure it's valid JSON
          const cleanedContent = content.trim();
          
          // Try to parse the content as JSON
          const parsedResult = JSON.parse(cleanedContent);
          
          // Initialize with default values if any required fields are missing
          const initializedResult: GeneratedContent = {
            analysis: {
              components: Array.isArray(parsedResult.analysis?.components) ? parsedResult.analysis.components : [],
              suggestedImprovements: parsedResult.analysis?.suggestedImprovements || ''
            },
            problemStatement: parsedResult.problemStatement || '',
            dataFramework: {
              dataPoints: parsedResult.dataFramework?.dataPoints || '',
              population: parsedResult.dataFramework?.population || '',
              dataSources: parsedResult.dataFramework?.dataSources || '',
              collectionMethods: parsedResult.dataFramework?.collectionMethods || '',
              frequency: parsedResult.dataFramework?.frequency || '',
              granularity: parsedResult.dataFramework?.granularity || '',
              qualityAssurance: parsedResult.dataFramework?.qualityAssurance || '',
              analysisApproach: parsedResult.dataFramework?.analysisApproach || ''
            },
            evidenceAndResearch: {
              evidence: Array.isArray(parsedResult.evidenceAndResearch?.evidence) ? parsedResult.evidenceAndResearch.evidence : [],
              qualityImprovementProjects: Array.isArray(parsedResult.evidenceAndResearch?.qualityImprovementProjects) ? parsedResult.evidenceAndResearch.qualityImprovementProjects : [],
              researchGaps: Array.isArray(parsedResult.evidenceAndResearch?.researchGaps) ? parsedResult.evidenceAndResearch.researchGaps : [],
              summary: parsedResult.evidenceAndResearch?.summary || ''
            }
          };
          setResult(initializedResult);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          console.error('Problematic content:', content);
          notifications.show({
            title: 'Error',
            message: 'Failed to parse the response. The API returned invalid JSON. Please try again.',
            color: 'red',
          });
        }
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
                  {result.analysis.components?.map((item, index) => (
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
                        <>
                          <Text size="sm">Summary: {item.summary}</Text>
                          <Text size="sm">Details: {item.details}</Text>
                        </>
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

              <Card shadow="sm" padding="lg" radius="md" withBorder className="mt-6">
                <Title order={3} className="mb-4">Evidence and Research Analysis</Title>
                <Stack spacing="md">
                  <div>
                    <Title order={4}>Relevant Evidence</Title>
                    {result.evidenceAndResearch.evidence?.map((item, index) => (
                      <div key={index} className="mb-4">
                        <Text weight={500}>{item.title}</Text>
                        <Text size="sm" color="dimmed">Source: {item.source}</Text>
                        <Text size="sm">Key Findings: {item.keyFindings}</Text>
                        <Text size="sm">Relevance: {item.relevance}</Text>
                      </div>
                    ))}
                  </div>

                  <div>
                    <Title order={4}>Quality Improvement Projects</Title>
                    {result.evidenceAndResearch.qualityImprovementProjects?.map((item, index) => (
                      <div key={index} className="mb-4">
                        <Text weight={500}>{item.projectName}</Text>
                        <Text size="sm" color="dimmed">Institution: {item.institution}</Text>
                        <Text size="sm">Interventions: {item.interventions}</Text>
                        <Text size="sm">Outcomes: {item.outcomes}</Text>
                        <Text size="sm">Lessons Learned: {item.lessonsLearned}</Text>
                      </div>
                    ))}
                  </div>

                  <div>
                    <Title order={4}>Research Gaps</Title>
                    {result.evidenceAndResearch.researchGaps?.map((item, index) => (
                      <div key={index} className="mb-4">
                        <Text weight={500}>{item.area}</Text>
                        <Text size="sm">Current Status: {item.currentStatus}</Text>
                        <Text size="sm">Potential Impact: {item.potentialImpact}</Text>
                      </div>
                    ))}
                  </div>

                  <div>
                    <Title order={4}>Summary</Title>
                    <Text>{result.evidenceAndResearch.summary}</Text>
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
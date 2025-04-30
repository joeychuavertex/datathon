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
  interventionsAndProgram: {
    interventions: Array<{
      intervention: string;
      description: string;
      resources: {
        staff: string;
        equipment: string;
        training: string;
      };
      timeline: string;
      challenges: string;
      mitigation: string;
    }>;
    programStructure: {
      objectives: string;
      stakeholders: string;
      implementationPhases: string;
      resourceAllocation: string;
      sustainability: string;
    };
    outcomeMeasures: {
      clinicalOutcome: {
        measure: string;
        definition: string;
        collection: string;
        frequency: string;
        target: string;
        benchmark: string;
      };
      processMeasure: {
        measure: string;
        definition: string;
        collection: string;
        frequency: string;
        target: string;
      };
      balancingMeasure?: {
        measure: string;
        definition: string;
        collection: string;
        frequency: string;
        target: string;
      };
      patientExperience?: {
        measure: string;
        definition: string;
        collection: string;
        frequency: string;
        target: string;
      };
    };
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

      const systemPrompt = `You are a healthcare data analyst specializing in Singapore's healthcare system. Based on the user's input, you will analyze the components and generate a comprehensive problem statement, data framework, evidence and research analysis, and proposed interventions and improvement program. You should always give a summary of the current state of knowledge even if there are missing components.

1. Analysis of Components:
First, analyze the user's input and identify which key components are present and which are missing. The required components are:
- Population/Process (specific patient group)
- Location/Setting (specific hospital AND ward - both must be present)
  * Hospital name (e.g., Singapore General Hospital or SGH, National University Hospital or NUH)
  * Department (e.g., Emergency Department, ICU)
  * Both elements must be specified for the component to be considered "present"
- Problem Description (specific clinical issue)
- Evidence/Data (quantitative measures)
- Consequences (measurable impacts)
- Contributing Factors (actionable causes)

For each component, provide:
- Whether it is present or missing
- Why it's important
- If missing: Suggested information to include and example
- If present: Summary of the provided information

For Location/Setting specifically:
- If only hospital is mentioned: Mark as "missing" and suggest adding ward information
- If only ward is mentioned: Mark as "missing" and suggest adding hospital information
- If both are present: Mark as "present" and summarize both elements
- Example of complete Location/Setting: "Singapore General Hospital, Orthopedics Department" or "National University Hospital, Emergency Department"


2. Suggested Problem Statement:
Based on the analysis of components, generate a complete problem statement in this format:
"The [specific patient population with relevant characteristics] at [specific hospital/location with ward/unit details] are experiencing [specific clinical problem or deviation from guidelines/standards] as evidenced by [specific quantitative data, audit results, or measurable observations that demonstrate the problem]. This is contributing to [specific clinical and operational consequences with measurable impacts] and is likely influenced by [specific systemic, process, or knowledge-based factors that contribute to the problem]."

For example, if the component analysis found:
- Population: "Elderly patients (≥65 years) with multiple comorbidities"
- Location: "Singapore General Hospital"
- Problem: "High incidence of medication errors"
- Evidence: "15% error rate in medication administration"
- Consequences: "Increased length of stay by 2 days on average"
- Contributing Factors: "Complex medication regimens and staff workload"

The problem statement should be:
"The elderly patients (≥65 years) with multiple comorbidities at comorbidities department, Singapore General Hospital are experiencing a high incidence of medication errors as evidenced by a 15% error rate in medication administration. This is contributing to an increased average length of stay by 2 days and is likely influenced by complex medication regimens and high staff workload."

Even if there are missing components, the suggested problem statement should still be generated with the suggested improvements.

3. A comprehensive data framework specifically tailored to Singapore's healthcare context including the following:
- Data points e.g., length of stay, readmission rates, complication rates
- Population e.g., patients above 60 years old who had undergone colon surgery
- Data sources e.g., electronic health records, hospital admission/discharge databases
- Collection methods e.g., automated data extraction from electronic health records, manual review of selected cases
- Frequency e.g., monthly or quarterly review
- Granularity e.g., individual patient level data
- Quality assurance e.g., data validation procedures, review of outliers
- Analysis approach e.g., descriptive analysis, trend analysis, benchmarking against standards or other hospital departments


4. Evidence and Research Analysis:
Provide evidence and research that is relevant based on the updated suggested problem statement. 

a) Relevant Evidence:
- List key studies, guidelines, and best practices
- Include local and international evidence
- Focus on Singapore healthcare context where possible
- Highlight key findings and their relevance

b) Quality Improvement Projects:
- List relevant QI projects from Singapore healthcare institutions
- Include interventions tried and their outcomes
- Highlight lessons learned and best practices
- Focus on similar patient populations or settings

c) Research Gaps:
- Identify areas needing further research
- Highlight opportunities for innovation
- Suggest potential impact of addressing these gaps

d) Summary:
- Provide a concise overview of the current state of knowledge
- Highlight key insights and implications
- Suggest next steps for evidence-based improvement

Even if there are limited data or components, you should still provide a summary of the current state of knowledge.

5. Proposed Interventions and Improvement Program:
Suggest a comprehensive improvement program that includes the following even if there are missing components:

a) Potential Interventions:
- List at least 3specific interventions that could address the problem
- For each intervention, specify:
  * Description of the intervention
  * Required resources (staff, equipment, training)
  * Implementation timeline
  * Potential challenges and mitigation strategies
  * Expected impact on the problem

b) Improvement Program Structure:
- Outline a structured program that includes:
  * Program objectives and goals
  * Key stakeholders and their roles
  * Implementation phases
  * Resource allocation plan
  * Sustainability strategies

c) Outcome Measures:
- Define appropriate outcome measures for:
  * Clinical outcomes (e.g., reduction in error rates, improvement in patient outcomes)
  * Process measures (e.g., adherence to protocols, completion rates)
  * Balancing measures (e.g., staff workload, resource utilization)
  * Patient experience measures (e.g., satisfaction scores, feedback)
- For each measure, specify:
  * Definition and calculation method
  * Data collection method
  * Frequency of measurement
  * Target values or improvement goals
  * Benchmarking against local or international standards

Even if there are limited data or components, you should still provide a summary of the current state of knowledge.


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
  },
  "interventionsAndProgram": {
    "interventions": [
      {
        "intervention": "string",
        "description": "string",
        "resources": {
          "staff": "string",
          "equipment": "string",
          "training": "string"
        },
        "timeline": "string",
        "challenges": "string",
        "mitigation": "string"
      }
    ],
    "programStructure": {
      "objectives": "string",
      "stakeholders": "string",
      "implementationPhases": "string",
      "resourceAllocation": "string",
      "sustainability": "string"
    },
    "outcomeMeasures": {
      "clinicalOutcome": {
        "measure": "string",
        "definition": "string",
        "collection": "string",
        "frequency": "string",
        "target": "string",
        "benchmark": "string"
      },
      "processMeasure": {
        "measure": "string",
        "definition": "string",
        "collection": "string",
        "frequency": "string",
        "target": "string"
      },
      "balancingMeasure": {
        "measure": "string",
        "definition": "string",
        "collection": "string",
        "frequency": "string",
        "target": "string"
      },
      "patientExperience": {
        "measure": "string",
        "definition": "string",
        "collection": "string",
        "frequency": "string",
        "target": "string"
      }
    }
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
            },
            interventionsAndProgram: {
              interventions: Array.isArray(parsedResult.interventionsAndProgram?.interventions) ? parsedResult.interventionsAndProgram.interventions : [],
              programStructure: {
                objectives: parsedResult.interventionsAndProgram?.programStructure?.objectives || '',
                stakeholders: parsedResult.interventionsAndProgram?.programStructure?.stakeholders || '',
                implementationPhases: parsedResult.interventionsAndProgram?.programStructure?.implementationPhases || '',
                resourceAllocation: parsedResult.interventionsAndProgram?.programStructure?.resourceAllocation || '',
                sustainability: parsedResult.interventionsAndProgram?.programStructure?.sustainability || ''
              },
              outcomeMeasures: {
                clinicalOutcome: {
                  measure: parsedResult.interventionsAndProgram?.outcomeMeasures?.clinicalOutcome?.measure || '',
                  definition: parsedResult.interventionsAndProgram?.outcomeMeasures?.clinicalOutcome?.definition || '',
                  collection: parsedResult.interventionsAndProgram?.outcomeMeasures?.clinicalOutcome?.collection || '',
                  frequency: parsedResult.interventionsAndProgram?.outcomeMeasures?.clinicalOutcome?.frequency || '',
                  target: parsedResult.interventionsAndProgram?.outcomeMeasures?.clinicalOutcome?.target || '',
                  benchmark: parsedResult.interventionsAndProgram?.outcomeMeasures?.clinicalOutcome?.benchmark || ''
                },
                processMeasure: {
                  measure: parsedResult.interventionsAndProgram?.outcomeMeasures?.processMeasure?.measure || '',
                  definition: parsedResult.interventionsAndProgram?.outcomeMeasures?.processMeasure?.definition || '',
                  collection: parsedResult.interventionsAndProgram?.outcomeMeasures?.processMeasure?.collection || '',
                  frequency: parsedResult.interventionsAndProgram?.outcomeMeasures?.processMeasure?.frequency || '',
                  target: parsedResult.interventionsAndProgram?.outcomeMeasures?.processMeasure?.target || ''
                },
                balancingMeasure: parsedResult.interventionsAndProgram?.outcomeMeasures?.balancingMeasure || null,
                patientExperience: parsedResult.interventionsAndProgram?.outcomeMeasures?.patientExperience || null
              }
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
                  Generate
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

              <Card shadow="sm" padding="lg" radius="md" withBorder className="mt-6">
                <Title order={3} className="mb-4">Proposed Interventions and Improvement Program</Title>
                <Stack spacing="md">
                  <div>
                    <Title order={4}>Potential Interventions</Title>
                    {result.interventionsAndProgram.interventions?.map((item, index) => (
                      <div key={index} className="mb-6">
                        <Text weight={500} size="lg">{item.intervention}</Text>
                        <Text size="sm" color="dimmed">{item.description}</Text>
                        <div className="mt-2">
                          <Text weight={500}>Resources Required:</Text>
                          <Text size="sm">Staff: {item.resources.staff}</Text>
                          <Text size="sm">Equipment: {item.resources.equipment}</Text>
                          <Text size="sm">Training: {item.resources.training}</Text>
                        </div>
                        <div className="mt-2">
                          <Text weight={500}>Timeline:</Text>
                          <Text size="sm">{item.timeline}</Text>
                        </div>
                        <div className="mt-2">
                          <Text weight={500}>Potential Challenges:</Text>
                          <Text size="sm">{item.challenges}</Text>
                        </div>
                        <div className="mt-2">
                          <Text weight={500}>Mitigation Strategies:</Text>
                          <Text size="sm">{item.mitigation}</Text>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <Title order={4}>Program Structure</Title>
                    <div className="mb-4">
                      <Text weight={500}>Objectives and Goals:</Text>
                      <Text size="sm">{result.interventionsAndProgram.programStructure.objectives}</Text>
                    </div>
                    <div className="mb-4">
                      <Text weight={500}>Key Stakeholders:</Text>
                      <Text size="sm">{result.interventionsAndProgram.programStructure.stakeholders}</Text>
                    </div>
                    <div className="mb-4">
                      <Text weight={500}>Implementation Phases:</Text>
                      <Text size="sm">{result.interventionsAndProgram.programStructure.implementationPhases}</Text>
                    </div>
                    <div className="mb-4">
                      <Text weight={500}>Resource Allocation:</Text>
                      <Text size="sm">{result.interventionsAndProgram.programStructure.resourceAllocation}</Text>
                    </div>
                    <div className="mb-4">
                      <Text weight={500}>Sustainability Strategies:</Text>
                      <Text size="sm">{result.interventionsAndProgram.programStructure.sustainability}</Text>
                    </div>
                  </div>

                  <div>
                    <Title order={4}>Outcome Measures</Title>
                    <div className="mb-4">
                      <Text weight={500}>Clinical Outcome:</Text>
                      <Text size="sm">Measure: {result.interventionsAndProgram.outcomeMeasures.clinicalOutcome.measure}</Text>
                      <Text size="sm">Definition: {result.interventionsAndProgram.outcomeMeasures.clinicalOutcome.definition}</Text>
                      <Text size="sm">Collection Method: {result.interventionsAndProgram.outcomeMeasures.clinicalOutcome.collection}</Text>
                      <Text size="sm">Frequency: {result.interventionsAndProgram.outcomeMeasures.clinicalOutcome.frequency}</Text>
                      <Text size="sm">Target: {result.interventionsAndProgram.outcomeMeasures.clinicalOutcome.target}</Text>
                      <Text size="sm">Benchmark: {result.interventionsAndProgram.outcomeMeasures.clinicalOutcome.benchmark}</Text>
                    </div>

                    <div className="mb-4">
                      <Text weight={500}>Process Measure:</Text>
                      <Text size="sm">Measure: {result.interventionsAndProgram.outcomeMeasures.processMeasure.measure}</Text>
                      <Text size="sm">Definition: {result.interventionsAndProgram.outcomeMeasures.processMeasure.definition}</Text>
                      <Text size="sm">Collection Method: {result.interventionsAndProgram.outcomeMeasures.processMeasure.collection}</Text>
                      <Text size="sm">Frequency: {result.interventionsAndProgram.outcomeMeasures.processMeasure.frequency}</Text>
                      <Text size="sm">Target: {result.interventionsAndProgram.outcomeMeasures.processMeasure.target}</Text>
                    </div>

                    {result.interventionsAndProgram.outcomeMeasures.balancingMeasure && (
                      <div className="mb-4">
                        <Text weight={500}>Balancing Measure:</Text>
                        <Text size="sm">Measure: {result.interventionsAndProgram.outcomeMeasures.balancingMeasure.measure}</Text>
                        <Text size="sm">Definition: {result.interventionsAndProgram.outcomeMeasures.balancingMeasure.definition}</Text>
                        <Text size="sm">Collection Method: {result.interventionsAndProgram.outcomeMeasures.balancingMeasure.collection}</Text>
                        <Text size="sm">Frequency: {result.interventionsAndProgram.outcomeMeasures.balancingMeasure.frequency}</Text>
                        <Text size="sm">Target: {result.interventionsAndProgram.outcomeMeasures.balancingMeasure.target}</Text>
                      </div>
                    )}

                    {result.interventionsAndProgram.outcomeMeasures.patientExperience && (
                      <div className="mb-4">
                        <Text weight={500}>Patient Experience Measure:</Text>
                        <Text size="sm">Measure: {result.interventionsAndProgram.outcomeMeasures.patientExperience.measure}</Text>
                        <Text size="sm">Definition: {result.interventionsAndProgram.outcomeMeasures.patientExperience.definition}</Text>
                        <Text size="sm">Collection Method: {result.interventionsAndProgram.outcomeMeasures.patientExperience.collection}</Text>
                        <Text size="sm">Frequency: {result.interventionsAndProgram.outcomeMeasures.patientExperience.frequency}</Text>
                        <Text size="sm">Target: {result.interventionsAndProgram.outcomeMeasures.patientExperience.target}</Text>
                      </div>
                    )}
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
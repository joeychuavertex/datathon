import { Card, Title, Text, Group, Stack, Badge, Paper } from '@mantine/core';
import { Department, Question } from '../types';

interface SuggestedQuestionsProps {
  department: Department;
  existingQuestions: Question[];
}

const getSuggestedQuestions = (department: Department, existingQuestions: Question[]): Question[] => {
  const existingTitles = existingQuestions.map(q => q.title.toLowerCase());
  
  // Common patterns for suggested questions
  const patterns = {
    cardiology: [
      {
        title: "Long-term Outcomes of Different Heart Failure Treatment Protocols",
        content: "Analyze the effectiveness of various heart failure treatment protocols over a 5-year period, focusing on readmission rates, mortality, and quality of life metrics.",
        tags: ["Heart Failure", "Treatment Protocols", "Long-term Outcomes"]
      },
      {
        title: "Impact of Early Cardiac Rehabilitation on Long-term Survival",
        content: "Investigate how the timing of cardiac rehabilitation initiation affects long-term survival rates and quality of life in post-MI patients.",
        tags: ["Cardiac Rehabilitation", "Survival Analysis", "Quality of Life"]
      }
    ],
    neurology: [
      {
        title: "Predictive Factors for Stroke Recovery Trajectory",
        content: "Identify key factors that predict different recovery trajectories in stroke patients, including biomarkers, initial severity, and rehabilitation timing.",
        tags: ["Stroke Recovery", "Predictive Modeling", "Biomarkers"]
      },
      {
        title: "Comparative Effectiveness of Different MS Treatment Regimens",
        content: "Compare the long-term effectiveness and side effect profiles of different multiple sclerosis treatment regimens.",
        tags: ["Multiple Sclerosis", "Treatment Comparison", "Side Effects"]
      }
    ],
    endocrinology: [
      {
        title: "Impact of Continuous Glucose Monitoring on Diabetes Management",
        content: "Analyze how continuous glucose monitoring affects glycemic control and quality of life in type 1 and type 2 diabetes patients.",
        tags: ["Diabetes", "Glucose Monitoring", "Quality of Life"]
      },
      {
        title: "Thyroid Function and Cardiovascular Risk",
        content: "Investigate the relationship between thyroid function parameters and cardiovascular risk factors in different age groups.",
        tags: ["Thyroid", "Cardiovascular Risk", "Age Groups"]
      }
    ],
    rehabilitation: [
      {
        title: "Optimal Timing for Rehabilitation Interventions",
        content: "Determine the optimal timing for initiating different types of rehabilitation interventions across various conditions.",
        tags: ["Rehabilitation Timing", "Intervention Effectiveness", "Patient Outcomes"]
      },
      {
        title: "Technology-Assisted Rehabilitation Outcomes",
        content: "Evaluate the effectiveness of technology-assisted rehabilitation methods compared to traditional approaches.",
        tags: ["Technology", "Rehabilitation", "Outcome Comparison"]
      }
    ]
  };

  // Get department-specific suggestions
  const departmentPatterns = patterns[department.name.toLowerCase() as keyof typeof patterns] || [];
  
  // Filter out suggestions that are too similar to existing questions
  return departmentPatterns
    .filter(suggestion => 
      !existingTitles.some(title => 
        title.includes(suggestion.title.toLowerCase().split(' ')[0])
      )
    )
    .map((suggestion, index) => ({
      id: -index - 1, // Negative IDs to distinguish from real questions
      title: suggestion.title,
      content: suggestion.content,
      analysis_summary: "This analysis would provide valuable insights into " + suggestion.content.split('.')[0].toLowerCase(),
      department_id: department.id,
      created_at: new Date().toISOString(),
      tags: suggestion.tags.map((tag, i) => ({
        id: -i - 1,
        name: tag,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        severity: 1 as number
      }))
    }));
};

const SuggestedQuestions = ({ department, existingQuestions }: SuggestedQuestionsProps) => {
  const suggestedQuestions = getSuggestedQuestions(department, existingQuestions);

  if (suggestedQuestions.length === 0) {
    return null;
  }

  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder
      className="bg-blue-50 border-blue-200"
    >
      <Stack spacing="md">
        <Title order={3} className="text-blue-800">Suggested Questions</Title>
        <Text size="sm" color="dimmed" className="text-blue-700">
          Potential areas for further analysis in {department.name}
        </Text>
        
        <div className="grid gap-4">
          {suggestedQuestions.map((question) => (
            <Paper 
              key={question.id} 
              p="md" 
              withBorder
              className="bg-white border-blue-200"
            >
              <Stack spacing="xs">
                <Title order={4} className="text-blue-900">{question.title}</Title>
                <Text size="sm" className="text-blue-800">{question.content}</Text>
                <Text size="xs" color="dimmed" className="text-blue-700">
                  {question.analysis_summary}
                </Text>
                <Group spacing="xs">
                  {question.tags.map((tag) => (
                    <Badge 
                      key={tag.id} 
                      variant="outline"
                      color="blue"
                      className="border-blue-300 text-blue-700"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </Group>
              </Stack>
            </Paper>
          ))}
        </div>
      </Stack>
    </Card>
  );
};

export default SuggestedQuestions; 
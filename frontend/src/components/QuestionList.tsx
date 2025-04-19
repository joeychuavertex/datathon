import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, Title, Text, Badge, Group, Stack, Paper } from '@mantine/core';
import Plot from 'react-plotly.js';
import { mockQuestions, mockDepartments } from '../mockData/departments';
import { Question } from '../types';
import { Data, Layout } from 'plotly.js';
import SuggestedQuestions from './SuggestedQuestions';

interface QuestionListProps {
  departmentId?: number;
}

interface ChartData {
  data: Data[];
  layout: Partial<Layout>;
}

interface TimelineChartData extends ChartData {
  type: 'timeline';
}

interface MetricsChartData extends ChartData {
  type: 'metrics';
}

type CombinedChartData = [TimelineChartData, MetricsChartData];

// Helper function to generate mock data based on query type
const generateChartData = (question: Question): ChartData | CombinedChartData | null => {
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
    case 'Thyroid Function Test Patterns':
      return {
        data: [{
          x: ['TSH', 'FT4', 'T3'],
          y: [4.5, 1.2, 2.8],
          type: 'bar',
          name: 'Hormone Levels',
          marker: { color: '#2196F3' }
        }],
        layout: {
          title: 'Thyroid Hormone Levels',
          xaxis: { title: 'Hormone' },
          yaxis: { title: 'Level' }
        }
      };
    case 'Obesity Management Outcomes':
      return {
        data: [{
          x: ['Baseline', '3 Months', '6 Months', '12 Months'],
          y: [95, 88, 82, 75],
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Average Weight (kg)',
          line: { color: '#FF5722' }
        }],
        layout: {
          title: 'Weight Management Progress',
          xaxis: { title: 'Time Period' },
          yaxis: { title: 'Weight (kg)' }
        }
      };
    case 'Parkinson\'s Disease Medication Adherence':
      return {
        data: [{
          x: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          y: [85, 90, 88, 92],
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Medication Adherence Rate',
          line: { color: '#E91E63' }
        }],
        layout: {
          title: 'Medication Adherence Over Time',
          xaxis: { title: 'Week' },
          yaxis: { title: 'Adherence Rate (%)' }
        }
      };
    case 'Epilepsy Seizure Control':
      return {
        data: [{
          x: ['No Sleep Pattern', 'Irregular Sleep', 'Regular Sleep'],
          y: [8, 5, 2],
          type: 'bar',
          name: 'Monthly Seizure Frequency',
          marker: { color: '#9C27B0' }
        }],
        layout: {
          title: 'Seizure Frequency by Sleep Pattern',
          xaxis: { title: 'Sleep Pattern' },
          yaxis: { title: 'Seizures per Month' }
        }
      };
    case 'Multiple Sclerosis Treatment Response':
      return {
        data: [{
          x: ['Baseline', '6 Months', '12 Months', '24 Months'],
          y: [2.5, 1.8, 1.2, 0.8],
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Annualized Relapse Rate',
          line: { color: '#FF9800' }
        }],
        layout: {
          title: 'MS Relapse Rate Over Time',
          xaxis: { title: 'Time Period' },
          yaxis: { title: 'Relapses per Year' }
        }
      };
    case 'Stroke Risk Assessment in Atrial Fibrillation':
      return {
        data: [{
          x: ['CHADS2 Score 0', 'CHADS2 Score 1', 'CHADS2 Score 2', 'CHADS2 Score 3+'],
          y: [1.9, 2.8, 4.0, 5.9],
          type: 'bar',
          name: 'Annual Stroke Risk (%)',
          marker: { color: '#2196F3' }
        }],
        layout: {
          title: 'Stroke Risk by CHADS2 Score',
          xaxis: { title: 'CHADS2 Score' },
          yaxis: { title: 'Annual Stroke Risk (%)' }
        }
      };
    case 'Heart Failure Readmission Prevention':
      return {
        data: [{
          x: ['Medication Adherence', 'Follow-up Visits', 'Weight Monitoring', 'Diet Compliance'],
          y: [85, 75, 65, 55],
          type: 'bar',
          name: 'Compliance Rate (%)',
          marker: { color: '#FF5722' }
        }],
        layout: {
          title: 'Heart Failure Management Compliance',
          xaxis: { title: 'Intervention' },
          yaxis: { title: 'Compliance Rate (%)' }
        }
      };
    case 'Hypertension Control Patterns':
      return {
        data: [{
          x: ['Monotherapy', 'Dual Therapy', 'Triple Therapy', 'Quadruple Therapy'],
          y: [45, 65, 80, 90],
          type: 'bar',
          name: 'Blood Pressure Control Rate (%)',
          marker: { color: '#4CAF50' }
        }],
        layout: {
          title: 'Blood Pressure Control by Treatment Strategy',
          xaxis: { title: 'Treatment Strategy' },
          yaxis: { title: 'Control Rate (%)' }
        }
      };
    case 'Cardiac Rehabilitation Program Outcomes':
      return {
        data: [{
          x: ['Baseline', '3 Months', '6 Months', '12 Months'],
          y: [4.5, 5.2, 5.8, 6.2],
          type: 'scatter',
          mode: 'lines+markers',
          name: '6-Minute Walk Distance (km)',
          line: { color: '#9C27B0' }
        }],
        layout: {
          title: 'Cardiac Rehabilitation Progress',
          xaxis: { title: 'Time Period' },
          yaxis: { title: '6-Minute Walk Distance (km)' }
        }
      };
    case 'Post-Stroke Rehabilitation Progress':
      // Functional recovery timeline
      const strokeTimelineData: TimelineChartData = {
        type: 'timeline',
        data: [
          {
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Motor Function',
            x: ['Week 1', 'Week 4', 'Week 8', 'Week 12'],
            y: [30, 45, 65, 80],
            marker: { color: '#4ecdc4', size: 12 },
            line: { color: '#4ecdc4', width: 2 }
          },
          {
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Cognitive Function',
            x: ['Week 1', 'Week 4', 'Week 8', 'Week 12'],
            y: [25, 40, 60, 75],
            marker: { color: '#45b7d1', size: 12 },
            line: { color: '#45b7d1', width: 2 }
          }
        ],
        layout: {
          title: 'Stroke Recovery Progress',
          xaxis: {
            title: 'Time After Stroke',
            showgrid: false
          },
          yaxis: {
            title: 'Function Score (%)',
            range: [0, 100]
          },
          annotations: [
            {
              x: 'Week 1',
              y: 30,
              text: 'Acute Care',
              showarrow: false,
              font: { color: '#ff0000' }
            },
            {
              x: 'Week 4',
              y: 45,
              text: 'Rehabilitation',
              showarrow: false,
              font: { color: '#4ecdc4' }
            }
          ],
          height: 400,
          showlegend: true,
          legend: {
            x: 1,
            xanchor: 'right',
            y: 1
          }
        }
      };

      // Daily activity recovery
      const strokeMetricsData: MetricsChartData = {
        type: 'metrics',
        data: [
          {
            type: 'bar',
            name: 'Baseline',
            x: ['Walking', 'Dressing', 'Eating', 'Speaking'],
            y: [20, 25, 30, 35],
            marker: { color: '#ff6b6b' }
          },
          {
            type: 'bar',
            name: '12 Weeks',
            x: ['Walking', 'Dressing', 'Eating', 'Speaking'],
            y: [75, 80, 85, 70],
            marker: { color: '#4ecdc4' }
          }
        ],
        layout: {
          title: 'Daily Activity Recovery',
          barmode: 'group',
          xaxis: { title: 'Activity' },
          yaxis: { title: 'Independence Score (%)' },
          height: 400,
          showlegend: true,
          legend: {
            x: 1,
            xanchor: 'right',
            y: 1
          }
        }
      };

      return [strokeTimelineData, strokeMetricsData];
    case 'Heart Attack Recovery Journey: From Acute Care to Rehabilitation':
      // Timeline data for patient journey
      const heartAttackTimelineData: TimelineChartData = {
        type: 'timeline',
        data: [
          {
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Ejection Fraction',
            x: ['Heart Attack', 'Hospital Day 3', 'Discharge', '1 Month', '3 Months', '6 Months'],
            y: [35, 40, 45, 50, 55, 60],
            marker: { 
              size: 12,
              color: ['#ff0000', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#4ecdc4']
            },
            line: { color: '#636363', width: 2 }
          },
          {
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Exercise Capacity',
            x: ['Heart Attack', 'Hospital Day 3', 'Discharge', '1 Month', '3 Months', '6 Months'],
            y: [0, 2, 4, 6, 8, 10],
            marker: { 
              size: 12,
              color: ['#ff0000', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#4ecdc4']
            },
            line: { color: '#636363', width: 2 },
            yaxis: 'y2'
          }
        ],
        layout: {
          title: 'Heart Attack Recovery Journey',
          xaxis: {
            title: 'Time Points',
            showgrid: false
          },
          yaxis: {
            title: 'Ejection Fraction (%)',
            range: [0, 70]
          },
          yaxis2: {
            title: 'Exercise Capacity (METs)',
            range: [0, 12],
            overlaying: 'y',
            side: 'right'
          },
          annotations: [
            {
              x: 'Heart Attack',
              y: 35,
              text: 'Cardiology',
              showarrow: false,
              font: { color: '#ff0000' }
            },
            {
              x: 'Discharge',
              y: 45,
              text: 'Rehabilitation',
              showarrow: false,
              font: { color: '#4ecdc4' }
            }
          ],
          height: 400
        }
      };

      // Outcome metrics data
      const heartAttackMetricsData: MetricsChartData = {
        type: 'metrics',
        data: [
          {
            type: 'bar',
            name: 'Early Rehab Group',
            x: ['Readmission Rate', 'Functional Recovery', 'Quality of Life', 'Return to Work'],
            y: [60, 80, 75, 70],
            marker: { color: '#4ecdc4' }
          },
          {
            type: 'bar',
            name: 'Late Rehab Group',
            x: ['Readmission Rate', 'Functional Recovery', 'Quality of Life', 'Return to Work'],
            y: [100, 30, 40, 35],
            marker: { color: '#ff6b6b' }
          }
        ],
        layout: {
          title: 'Outcome Comparison (6 Months)',
          barmode: 'group',
          xaxis: { title: 'Outcome Measure' },
          yaxis: { title: 'Score (%)' },
          height: 400
        }
      };

      return [heartAttackTimelineData, heartAttackMetricsData];
    case 'Cross-Department Medication Adherence Analysis':
      return {
        data: [
          {
            x: ['Diabetes', 'Hypertension', 'Heart Failure', 'COPD'],
            y: [85, 78, 72, 65],
            type: 'bar',
            name: 'Medication Adherence Rate',
            marker: { color: '#4CAF50' }
          },
          {
            x: ['Diabetes', 'Hypertension', 'Heart Failure', 'COPD'],
            y: [92, 88, 85, 80],
            type: 'bar',
            name: 'Disease Control Rate',
            marker: { color: '#2196F3' }
          }
        ],
        layout: {
          title: 'Medication Adherence and Disease Control by Condition',
          xaxis: { title: 'Chronic Condition' },
          yaxis: { title: 'Rate (%)' },
          barmode: 'group'
        }
      };
    default:
      return null;
  }
};

const QuestionList = ({ departmentId }: QuestionListProps) => {
  const filteredQuestions = departmentId
    ? mockQuestions.filter(question => question.department_id === departmentId)
    : mockQuestions;

  const currentDepartment = departmentId 
    ? mockDepartments.find(dept => dept.id === departmentId)
    : undefined;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Title order={1} className="text-2xl font-bold text-gray-800">
          {departmentId ? 'Department Questions' : 'Clinical Questions'}
        </Title>
        <Link
          to="/questions/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Question
        </Link>
      </div>

      <div className="grid gap-6">
        {currentDepartment && (
          <SuggestedQuestions 
            department={currentDepartment} 
            existingQuestions={filteredQuestions} 
          />
        )}

        {filteredQuestions.map((question) => {
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

                {chartData && (question.title === 'Post-Stroke Rehabilitation Progress' || question.title.includes("Heart Attack Recovery Journey")) ? (
                  <Stack spacing="xl">
                    <Paper p="md" withBorder>
                      <Title order={4} mb="md">Recovery Progress Timeline</Title>
                      <Plot
                        data={(chartData as CombinedChartData)[0].data}
                        layout={(chartData as CombinedChartData)[0].layout}
                        style={{ width: '100%' }}
                      />
                    </Paper>
                    <Paper p="md" withBorder>
                      <Title order={4} mb="md">Outcome Metrics</Title>
                      <Plot
                        data={(chartData as CombinedChartData)[1].data}
                        layout={(chartData as CombinedChartData)[1].layout}
                        style={{ width: '100%' }}
                      />
                    </Paper>
                  </Stack>
                ) : chartData && (
                  <div className="mt-4">
                    <Text size="sm" weight={500} className="mb-2">
                      SlicerDicer Analysis
                    </Text>
                    <Plot
                      data={(chartData as ChartData).data}
                      layout={(chartData as ChartData).layout}
                      style={{ width: '100%' }}
                    />
                  </div>
                )}

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
                  <Link
                    to={`/questions/${question.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Details →
                  </Link>
                </Group>
              </Stack>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionList; 
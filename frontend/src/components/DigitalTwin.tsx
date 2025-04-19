import React, { useState } from 'react';
import { Container, Title, Text, Select, Button, Group, Paper, Stack, Textarea, Tabs, Card, Badge } from '@mantine/core';
import Plot from 'react-plotly.js';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  conditions: string[];
  vitals: {
    glucose: number;
    bloodPressure: number;
    heartRate: number;
    cholesterol: number;
    kidneyFunction: number;
  };
}

interface SimulationResult {
  cardiovascular: {
    risk: number;
    changes: number[];
    timePoints: number[];
  };
  nephrology: {
    risk: number;
    changes: number[];
    timePoints: number[];
  };
  endocrinology: {
    risk: number;
    changes: number[];
    timePoints: number[];
  };
  neurology: {
    risk: number;
    changes: number[];
    timePoints: number[];
  };
  recommendations: string[];
}

// Mock patient data with detailed health information
const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    conditions: ['Type 2 Diabetes', 'Hypertension'],
    vitals: {
      glucose: 180,
      bloodPressure: 140,
      heartRate: 75,
      cholesterol: 220,
      kidneyFunction: 85,
    },
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 32,
    gender: 'Female',
    conditions: ['Prediabetes', 'Obesity'],
    vitals: {
      glucose: 110,
      bloodPressure: 130,
      heartRate: 82,
      cholesterol: 190,
      kidneyFunction: 95,
    },
  },
  {
    id: '3',
    name: 'Robert Johnson',
    age: 58,
    gender: 'Male',
    conditions: ['Heart Disease', 'High Cholesterol'],
    vitals: {
      glucose: 95,
      bloodPressure: 150,
      heartRate: 68,
      cholesterol: 250,
      kidneyFunction: 75,
    },
  },
];

// Generate mock simulation results based on the scenario
const generateSimulationResults = (patient: Patient, scenario: string): SimulationResult => {
  const timePoints = Array.from({ length: 12 }, (_, i) => i);
  
  // Base the simulation on the patient's current conditions and the scenario
  const baseRisk = {
    cardiovascular: patient.conditions.includes('Heart Disease') ? 0.6 : 0.3,
    nephrology: patient.vitals.kidneyFunction < 80 ? 0.5 : 0.2,
    endocrinology: patient.conditions.includes('Type 2 Diabetes') ? 0.7 : 0.3,
    neurology: 0.2,
  };

  // Simulate changes over time
  const simulateChanges = (baseValue: number, factor: number) => {
    return timePoints.map(t => baseValue * (1 + (t * factor)));
  };

  return {
    cardiovascular: {
      risk: baseRisk.cardiovascular * 1.2,
      changes: simulateChanges(patient.vitals.bloodPressure, 0.05),
      timePoints,
    },
    nephrology: {
      risk: baseRisk.nephrology * 1.1,
      changes: simulateChanges(patient.vitals.kidneyFunction, -0.03),
      timePoints,
    },
    endocrinology: {
      risk: baseRisk.endocrinology * 1.3,
      changes: simulateChanges(patient.vitals.glucose, 0.08),
      timePoints,
    },
    neurology: {
      risk: baseRisk.neurology * 1.1,
      changes: simulateChanges(1, 0.02),
      timePoints,
    },
    recommendations: [
      "Monitor blood glucose levels closely",
      "Schedule regular cardiovascular check-ups",
      "Maintain a balanced diet with controlled carbohydrate intake",
      "Engage in regular physical activity",
      "Consider consultation with an endocrinologist",
    ],
  };
};

const DigitalTwin: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [scenario, setScenario] = useState('');
  const [results, setResults] = useState<SimulationResult | null>(null);

  const handleSimulate = () => {
    if (selectedPatient && scenario) {
      setResults(generateSimulationResults(selectedPatient, scenario));
    }
  };

  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="xl">Digital Twin Simulator</Title>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Paper p="md" mb="xl" withBorder>
            <Stack spacing="md">
              <Title order={2}>Patient Selection</Title>
              <Select
                label="Select Patient"
                placeholder="Choose a patient"
                data={mockPatients.map(patient => ({
                  value: patient.id,
                  label: `${patient.name} (${patient.age}, ${patient.gender}) - ${patient.conditions.join(', ')}`
                }))}
                value={selectedPatient?.id}
                onChange={(value) => setSelectedPatient(mockPatients.find(p => p.id === value) || null)}
                style={{ width: '100%' }}
              />

              {selectedPatient && (
                <Card withBorder>
                  <Stack spacing="xs">
                    <Text weight={500}>Current Health Status</Text>
                    <Group>
                      <Badge color="blue">Glucose: {selectedPatient.vitals.glucose} mg/dL</Badge>
                      <Badge color="red">BP: {selectedPatient.vitals.bloodPressure} mmHg</Badge>
                      <Badge color="green">HR: {selectedPatient.vitals.heartRate} bpm</Badge>
                    </Group>
                    <Group>
                      <Badge color="yellow">Cholesterol: {selectedPatient.vitals.cholesterol} mg/dL</Badge>
                      <Badge color="cyan">Kidney Function: {selectedPatient.vitals.kidneyFunction}%</Badge>
                    </Group>
                  </Stack>
                </Card>
              )}

              <Textarea
                label="Simulation Scenario"
                placeholder="Describe the scenario you want to simulate (e.g., 'How would a 20% increase in daily glucose intake affect this patient?')"
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                minRows={3}
              />

              <Button 
                onClick={handleSimulate}
                disabled={!selectedPatient || !scenario}
              >
                Run Simulation
              </Button>
            </Stack>
          </Paper>
        </div>

        {results && (
          <div>
            <Title order={2} mb="md">Simulation Results</Title>
            <Tabs defaultValue="overview">
              <Tabs.List>
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="cardiovascular">Cardiovascular</Tabs.Tab>
                <Tabs.Tab value="nephrology">Nephrology</Tabs.Tab>
                <Tabs.Tab value="endocrinology">Endocrinology</Tabs.Tab>
                <Tabs.Tab value="neurology">Neurology</Tabs.Tab>
                <Tabs.Tab value="recommendations">Recommendations</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="overview" pt="md">
                <Plot
                  data={[
                    {
                      y: results.cardiovascular.changes,
                      x: results.cardiovascular.timePoints,
                      type: 'scatter',
                      mode: 'lines+markers',
                      name: 'Cardiovascular Risk',
                    },
                    {
                      y: results.nephrology.changes,
                      x: results.nephrology.timePoints,
                      type: 'scatter',
                      mode: 'lines+markers',
                      name: 'Kidney Function',
                    },
                    {
                      y: results.endocrinology.changes,
                      x: results.endocrinology.timePoints,
                      type: 'scatter',
                      mode: 'lines+markers',
                      name: 'Glucose Levels',
                    },
                  ]}
                  layout={{
                    title: 'Health Impact Over Time',
                    xaxis: { title: 'Time (months)' },
                    yaxis: { title: 'Value' },
                    height: 400,
                  }}
                />
              </Tabs.Panel>

              <Tabs.Panel value="cardiovascular" pt="md">
                <Stack spacing="md">
                  <Card withBorder>
                    <Text weight={500}>Cardiovascular Risk Assessment</Text>
                    <Text size="sm" color="dimmed">
                      Risk Score: {(results.cardiovascular.risk * 100).toFixed(1)}%
                    </Text>
                    <Plot
                      data={[{
                        y: results.cardiovascular.changes,
                        x: results.cardiovascular.timePoints,
                        type: 'scatter',
                        mode: 'lines+markers',
                      }]}
                      layout={{
                        title: 'Blood Pressure Changes',
                        xaxis: { title: 'Time (months)' },
                        yaxis: { title: 'Blood Pressure (mmHg)' },
                        height: 300,
                      }}
                    />
                  </Card>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="nephrology" pt="md">
                <Stack spacing="md">
                  <Card withBorder>
                    <Text weight={500}>Kidney Function Assessment</Text>
                    <Text size="sm" color="dimmed">
                      Risk Score: {(results.nephrology.risk * 100).toFixed(1)}%
                    </Text>
                    <Plot
                      data={[{
                        y: results.nephrology.changes,
                        x: results.nephrology.timePoints,
                        type: 'scatter',
                        mode: 'lines+markers',
                      }]}
                      layout={{
                        title: 'Kidney Function Changes',
                        xaxis: { title: 'Time (months)' },
                        yaxis: { title: 'Kidney Function (%)' },
                        height: 300,
                      }}
                    />
                  </Card>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="endocrinology" pt="md">
                <Stack spacing="md">
                  <Card withBorder>
                    <Text weight={500}>Endocrine System Assessment</Text>
                    <Text size="sm" color="dimmed">
                      Risk Score: {(results.endocrinology.risk * 100).toFixed(1)}%
                    </Text>
                    <Plot
                      data={[{
                        y: results.endocrinology.changes,
                        x: results.endocrinology.timePoints,
                        type: 'scatter',
                        mode: 'lines+markers',
                      }]}
                      layout={{
                        title: 'Glucose Level Changes',
                        xaxis: { title: 'Time (months)' },
                        yaxis: { title: 'Glucose (mg/dL)' },
                        height: 300,
                      }}
                    />
                  </Card>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="neurology" pt="md">
                <Stack spacing="md">
                  <Card withBorder>
                    <Text weight={500}>Neurological Impact Assessment</Text>
                    <Text size="sm" color="dimmed">
                      Risk Score: {(results.neurology.risk * 100).toFixed(1)}%
                    </Text>
                    <Plot
                      data={[{
                        y: results.neurology.changes,
                        x: results.neurology.timePoints,
                        type: 'scatter',
                        mode: 'lines+markers',
                      }]}
                      layout={{
                        title: 'Neurological Impact',
                        xaxis: { title: 'Time (months)' },
                        yaxis: { title: 'Impact Score' },
                        height: 300,
                      }}
                    />
                  </Card>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="recommendations" pt="md">
                <Stack spacing="md">
                  {results.recommendations.map((rec, index) => (
                    <Card key={index} withBorder>
                      <Text>{rec}</Text>
                    </Card>
                  ))}
                </Stack>
              </Tabs.Panel>
            </Tabs>
          </div>
        )}
      </div>
    </Container>
  );
};

export default DigitalTwin; 
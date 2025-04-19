import { Card, Title, Text, Badge, Group, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';
import { mockQuestions } from '../mockData/departments';
import { Tag } from '../types';
import Plot from 'react-plotly.js';
import { Data, Layout } from 'plotly.js';

interface TagNode {
  id: number;
  name: string;
  size: number;
  x: number;
  y: number;
}

interface TagEdge {
  source: number;
  target: number;
  value: number;
}

const SnowmedTags = () => {
  // Build tag relationships
  const tagMap = new Map<number, Tag>();
  const tagQuestions = new Map<number, Set<number>>();
  const tagConnections = new Map<string, number>();

  mockQuestions.forEach(question => {
    question.tags.forEach(tag => {
      tagMap.set(tag.id, tag);
      if (!tagQuestions.has(tag.id)) {
        tagQuestions.set(tag.id, new Set());
      }
      tagQuestions.get(tag.id)?.add(question.id);
    });

    // Build connections between tags
    question.tags.forEach(tag1 => {
      question.tags.forEach(tag2 => {
        if (tag1.id !== tag2.id) {
          const key = `${Math.min(tag1.id, tag2.id)}-${Math.max(tag1.id, tag2.id)}`;
          tagConnections.set(key, (tagConnections.get(key) || 0) + 1);
        }
      });
    });
  });

  // Prepare data for network chart
  const nodes: TagNode[] = Array.from(tagMap.values()).map((tag, index) => ({
    id: tag.id,
    name: tag.name,
    size: tagQuestions.get(tag.id)?.size || 0,
    x: Math.cos((index * 2 * Math.PI) / tagMap.size),
    y: Math.sin((index * 2 * Math.PI) / tagMap.size)
  }));

  const edges: TagEdge[] = Array.from(tagConnections.entries()).map(([key, value]) => {
    const [source, target] = key.split('-').map(Number);
    return { source, target, value };
  });

  // Create network chart data
  const nodeData: Data = {
    type: 'scatter',
    mode: 'markers+text' as const,
    x: nodes.map(node => node.x),
    y: nodes.map(node => node.y),
    text: nodes.map(node => node.name),
    marker: {
      size: nodes.map(node => Math.max(20, node.size * 5)),
      color: nodes.map(node => `hsl(${node.id * 30 % 360}, 70%, 50%)`)
    }
  };

  const edgeData: Data = {
    type: 'scatter',
    mode: 'lines',
    x: edges.flatMap(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      return [sourceNode?.x || 0, targetNode?.x || 0, null];
    }),
    y: edges.flatMap(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      return [sourceNode?.y || 0, targetNode?.y || 0, null];
    }),
    line: {
      color: 'rgba(128, 128, 128, 0.3)',
      width: edges.map(edge => Math.max(1, edge.value))
    }
  };

  const layout: Partial<Layout> = {
    title: 'SNOWMED Tag Network',
    showlegend: false,
    hovermode: 'closest',
    height: 600,
    margin: { t: 50, l: 50, r: 50, b: 50 },
    xaxis: {
      showgrid: false,
      zeroline: false,
      showticklabels: false,
      range: [-1.2, 1.2]
    },
    yaxis: {
      showgrid: false,
      zeroline: false,
      showticklabels: false,
      range: [-1.2, 1.2]
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <Title order={1} className="text-2xl font-bold text-gray-800">
          SNOWMED Tags
        </Title>
        <Text size="sm" color="dimmed" mt={2}>
          Explore clinical concepts and their relationships
        </Text>
      </div>

      <div className="grid gap-6">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack spacing="md">
            <Title order={2} className="text-xl font-semibold">
              Tag Network
            </Title>
            <Text size="sm" color="dimmed">
              Visual representation of how SNOWMED tags are connected through questions
            </Text>
            <div className="w-full h-[600px]">
              <Plot
                data={[edgeData, nodeData]}
                layout={layout}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </Stack>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from(tagMap.values()).map((tag) => (
            <Link 
              key={tag.id} 
              to={`/tags/${tag.id}`}
              className="block"
            >
              <Card 
                shadow="sm" 
                padding="lg" 
                radius="md" 
                withBorder
                className="hover:shadow-md transition-shadow"
              >
                <Stack spacing="xs">
                  <Group position="apart">
                    <Title order={3} className="text-lg font-semibold">
                      {tag.name}
                    </Title>
                    <Badge color="blue" size="sm">
                      {tagQuestions.get(tag.id)?.size || 0} questions
                    </Badge>
                  </Group>
                  <Text size="sm" color="dimmed">
                    {tag.description || 'No description available'}
                  </Text>
                  {tag.snomed_concept_id && (
                    <Text size="xs" color="dimmed">
                      SNOWMED ID: {tag.snomed_concept_id}
                    </Text>
                  )}
                </Stack>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SnowmedTags; 
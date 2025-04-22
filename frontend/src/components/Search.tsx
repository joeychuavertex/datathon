import React, { useState } from 'react';
import { Container, Title, Text, TextInput, Paper, Group, Stack, Card, Badge, Tabs, Loader } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { fetchQuestions } from '../services/api';

interface SearchResult {
  type: 'question' | 'paper';
  title: string;
  content: string;
  source?: string;
  tags?: string[];
  date?: string;
  relevance: number;
}

// Mock research papers data
const mockPapers = [
  {
    id: '1',
    title: 'Machine Learning in Healthcare: A Systematic Review',
    abstract: 'This paper reviews the current state of machine learning applications in healthcare, focusing on predictive analytics, disease diagnosis, and treatment optimization. We analyze 150 recent studies and identify key trends and challenges in implementing ML solutions in clinical settings.',
    authors: ['Smith, J.', 'Johnson, R.', 'Williams, A.'],
    journal: 'Healthcare Informatics',
    year: 2023,
    doi: '10.1234/hi.2023.001',
    keywords: ['machine learning', 'healthcare', 'predictive analytics', 'clinical decision support']
  },
  {
    id: '2',
    title: 'Digital Twins for Patient Care: Current Applications and Future Directions',
    abstract: 'Digital twins are emerging as a powerful tool for personalized healthcare. This paper explores their application in chronic disease management, surgical planning, and drug development. We present case studies from leading healthcare institutions and discuss implementation challenges.',
    authors: ['Brown, M.', 'Davis, K.', 'Taylor, L.'],
    journal: 'Medical Technology Review',
    year: 2023,
    doi: '10.1234/mtr.2023.002',
    keywords: ['digital twins', 'personalized medicine', 'chronic disease', 'healthcare innovation']
  },
  {
    id: '3',
    title: 'Blockchain in Healthcare: Securing Patient Data and Improving Interoperability',
    abstract: 'This study examines the potential of blockchain technology to enhance healthcare data security and interoperability. We present a framework for implementing blockchain solutions in healthcare systems and analyze its impact on patient privacy and data sharing.',
    authors: ['Lee, S.', 'Chen, W.', 'Patel, R.'],
    journal: 'Journal of Healthcare Technology',
    year: 2023,
    doi: '10.1234/jht.2023.003',
    keywords: ['blockchain', 'healthcare security', 'data interoperability', 'patient privacy']
  },
  {
    id: '4',
    title: 'AI-Powered Clinical Decision Support Systems: A Comprehensive Review',
    abstract: 'This comprehensive review analyzes the effectiveness of AI-powered clinical decision support systems in various medical specialties. We evaluate their impact on diagnostic accuracy, treatment planning, and patient outcomes, with a focus on real-world implementation challenges.',
    authors: ['Garcia, M.', 'Kim, J.', 'Anderson, P.'],
    journal: 'Artificial Intelligence in Medicine',
    year: 2023,
    doi: '10.1234/aim.2023.004',
    keywords: ['artificial intelligence', 'clinical decision support', 'healthcare AI', 'medical diagnosis']
  }
];

// Mock questions data
const mockQuestions = [
  {
    id: '1',
    title: 'How can machine learning improve early detection of diabetes?',
    content: "I'm interested in understanding how machine learning algorithms can be used to predict the onset of diabetes based on patient data. What are the most effective features and models for this purpose?",
    tags: ['machine learning', 'diabetes', 'predictive analytics', 'healthcare'],
    department: 'Endocrinology',
    date: '2023-10-15'
  },
  {
    id: '2',
    title: 'What are the best practices for implementing digital twins in hospital settings?',
    content: "Our hospital is considering implementing digital twin technology for patient monitoring. What are the key considerations, challenges, and best practices we should be aware of?",
    tags: ['digital twins', 'hospital management', 'patient monitoring', 'healthcare technology'],
    department: 'Hospital Administration',
    date: '2023-11-02'
  },
  {
    id: '3',
    title: 'How can blockchain technology enhance patient data security?',
    content: "I'm researching ways to improve patient data security in our healthcare system. How can blockchain technology be implemented to ensure secure and transparent data sharing while maintaining patient privacy?",
    tags: ['blockchain', 'data security', 'patient privacy', 'healthcare IT'],
    department: 'Information Technology',
    date: '2023-11-20'
  },
  {
    id: '4',
    title: 'What are the ethical considerations in using AI for clinical decision support?',
    content: "As we implement AI systems for clinical decision support, what are the key ethical considerations we need to address? How can we ensure transparency, fairness, and accountability in these systems?",
    tags: ['artificial intelligence', 'ethics', 'clinical decision support', 'healthcare policy'],
    department: 'Medical Ethics',
    date: '2023-12-05'
  }
];

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string | null>('all');

  // Remove unused query since we're using mock data
  // const { data: questions, isLoading: isLoadingQuestions } = useQuery({
  //   queryKey: ['questions'],
  //   queryFn: fetchQuestions,
  // });

  // Mock search function that combines questions and papers
  const performSearch = (query: string): SearchResult[] => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    const results: SearchResult[] = [];

    // Search in questions (using mock data)
    mockQuestions.forEach(question => {
      const matchesTitle = question.title.toLowerCase().includes(lowerQuery);
      const matchesContent = question.content.toLowerCase().includes(lowerQuery);
      const matchesTags = question.tags.some(tag => tag.toLowerCase().includes(lowerQuery));

      if (matchesTitle || matchesContent || matchesTags) {
        results.push({
          type: 'question',
          title: question.title,
          content: question.content,
          tags: question.tags,
          date: question.date,
          relevance: matchesTitle ? 1 : (matchesContent ? 0.8 : 0.6),
        });
      }
    });

    // Search in papers
    mockPapers.forEach(paper => {
      const matchesTitle = paper.title.toLowerCase().includes(lowerQuery);
      const matchesAbstract = paper.abstract.toLowerCase().includes(lowerQuery);
      const matchesKeywords = paper.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery));

      if (matchesTitle || matchesAbstract || matchesKeywords) {
        results.push({
          type: 'paper',
          title: paper.title,
          content: paper.abstract,
          source: `${paper.journal}, ${paper.year}`,
          tags: paper.keywords,
          date: `${paper.year}`,
          relevance: matchesTitle ? 1 : (matchesAbstract ? 0.8 : 0.6),
        });
      }
    });

    // Sort by relevance
    return results.sort((a, b) => b.relevance - a.relevance);
  };

  const searchResults = performSearch(searchQuery);
  const filteredResults = activeTab === 'all' 
    ? searchResults 
    : searchResults.filter(result => result.type === activeTab);

  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="xl">Search</Title>
      
      <Paper p="md" mb="xl" withBorder>
        <Stack spacing="md">
          <TextInput
            placeholder="Search for questions, research papers, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="lg"
          />
        </Stack>
      </Paper>

      {searchQuery && (
        <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
          <Tabs.List>
            <Tabs.Tab value="all">All Results</Tabs.Tab>
            <Tabs.Tab value="question">Questions</Tabs.Tab>
            <Tabs.Tab value="paper">Research Papers</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="all" pt="md">
            <Stack spacing="md">
              {filteredResults.length > 0 ? (
                filteredResults.map((result, index) => (
                  <Card key={index} withBorder>
                    <Group position="apart" mb="xs">
                      <Text weight={500}>{result.title}</Text>
                      <Badge color={result.type === 'question' ? 'blue' : 'green'}>
                        {result.type === 'question' ? 'Question' : 'Research Paper'}
                      </Badge>
                    </Group>
                    <Text size="sm" color="dimmed" mb="xs">
                      {result.content}
                    </Text>
                    {result.source && (
                      <Text size="xs" color="dimmed">
                        Source: {result.source}
                      </Text>
                    )}
                    {result.tags && result.tags.length > 0 && (
                      <Group spacing="xs" mt="xs">
                        {result.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="light">
                            {tag}
                          </Badge>
                        ))}
                      </Group>
                    )}
                  </Card>
                ))
              ) : (
                <Text>No results found</Text>
              )}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="question" pt="md">
            <Stack spacing="md">
              {filteredResults.length > 0 ? (
                filteredResults.map((result, index) => (
                  <Card key={index} withBorder>
                    <Text weight={500} mb="xs">{result.title}</Text>
                    <Text size="sm" color="dimmed" mb="xs">
                      {result.content}
                    </Text>
                    {result.tags && result.tags.length > 0 && (
                      <Group spacing="xs" mt="xs">
                        {result.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="light">
                            {tag}
                          </Badge>
                        ))}
                      </Group>
                    )}
                  </Card>
                ))
              ) : (
                <Text>No questions found</Text>
              )}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="paper" pt="md">
            <Stack spacing="md">
              {filteredResults.length > 0 ? (
                filteredResults.map((result, index) => (
                  <Card key={index} withBorder>
                    <Text weight={500} mb="xs">{result.title}</Text>
                    <Text size="sm" color="dimmed" mb="xs">
                      {result.content}
                    </Text>
                    {result.source && (
                      <Text size="xs" color="dimmed">
                        Source: {result.source}
                      </Text>
                    )}
                  </Card>
                ))
              ) : (
                <Text>No research papers found</Text>
              )}
            </Stack>
          </Tabs.Panel>
        </Tabs>
      )}
    </Container>
  );
};

export default Search; 
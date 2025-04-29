import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import QuestionList from './components/QuestionList';
import QuestionForm from './components/QuestionForm';
import QuestionDetail from './components/QuestionDetail';
import DepartmentList from './components/DepartmentList';
import SnomedTags from './components/SnomedTags';
import TagQuestions from './components/TagQuestions';
import DigitalTwin from './components/DigitalTwin';
import Search from './components/Search';
import ProblemConstructor from './components/ProblemConstructor';

const queryClient = new QueryClient();

const DepartmentQuestions = () => {
  const { id } = useParams();
  return <QuestionList departmentId={id ? parseInt(id) : 0} />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={{
          breakpoints: {
            xs: '30em',
            sm: '48em',
            md: '64em',
            lg: '74em',
            xl: '90em',
          },
        }}
      >
        <Notifications />
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Layout>
              <main className="container mx-auto px-4 py-4 md:py-8">
                <div className="max-w-7xl mx-auto">
                  <Routes>
                    <Route path="/" element={<QuestionList />} />
                    <Route path="/questions" element={<QuestionList />} />
                    <Route path="/questions/new" element={<QuestionForm />} />
                    <Route path="/questions/:id" element={<QuestionDetail />} />
                    <Route path="/departments" element={<DepartmentList />} />
                    <Route path="/departments/:id" element={<DepartmentQuestions />} />
                    <Route path="/tags" element={<SnomedTags />} />
                    <Route path="/tags/:tagId" element={<TagQuestions />} />
                    <Route path="/digital-twin" element={<DigitalTwin />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/problem-constructor" element={<ProblemConstructor />} />
                  </Routes>
                </div>
              </main>
            </Layout>
          </div>
        </Router>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;

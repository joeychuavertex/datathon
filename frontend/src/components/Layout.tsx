import { Link } from 'react-router-dom';
import { mockDepartments } from '../mockData/departments';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen">
      {/* Left Panel - Departments */}
      <div className="w-64 bg-white shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Departments</h2>
        <div className="space-y-2">
          {mockDepartments.map((department) => (
            <Link
              key={department.id}
              to={`/departments/${department.id}`}
              className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            >
              {department.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout; 
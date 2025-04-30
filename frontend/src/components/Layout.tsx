import { Link } from 'react-router-dom';
import { mockDepartments } from '../mockData/departments';
import { useState } from 'react';
import { Burger } from '@mantine/core';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Mobile Menu Button */}
      <div className="md:hidden p-4 bg-white shadow-md">
        <Burger
          opened={sidebarOpen}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          size="sm"
          className="cursor-pointer"
        />
      </div>

      {/* Left Panel - Departments */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-white shadow-md p-4 transition-all duration-300`}>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Departments</h2>
        <div className="space-y-2">
          {mockDepartments.map((department) => (
            <Link
              key={department.id}
              to={`/departments/${department.id}`}
              className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              {department.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4">
        {children}
      </div>
    </div>
  );
};

export default Layout; 
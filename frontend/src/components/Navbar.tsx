import { Link } from 'react-router-dom';
import { Burger } from '@mantine/core';
import { useState } from 'react';
import { Group } from '@mantine/core';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Datathon
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:space-x-8">
            <Link
              to="/questions"
              className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Questions
            </Link>
            <Link
              to="/tags"
              className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              SNOMED Tags
            </Link>
            <Link
              to="/digital-twin"
              className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Digital Twin
            </Link>
            <Link
              to="/search"
              className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Search
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <Burger
              opened={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              size="sm"
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/questions"
              className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Questions
            </Link>
            <Link
              to="/tags"
              className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              SNOMED Tags
            </Link>
            <Link
              to="/digital-twin"
              className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Digital Twin
            </Link>
            <Link
              to="/search"
              className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Search
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
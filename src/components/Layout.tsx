import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TrendingSidebar from './TrendingSidebar';
import { useTheme } from '../contexts/ThemeContext';

const Layout: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="container mx-auto flex">
        {/* Left sidebar */}
        <Sidebar />
        
        {/* Main content */}
        <main className="flex-1 border-x border-border-color dark:border-gray-800 min-h-screen">
          <Outlet />
        </main>
        
        {/* Right sidebar - hidden on mobile */}
        <div className="hidden lg:block w-80">
          <TrendingSidebar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
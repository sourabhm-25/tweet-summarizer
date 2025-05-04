import React from 'react';
import { NavLink } from 'react-router-dom';
import { Twitter, Home, Search, Bell, Mail, Bookmark, User, Settings, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Sidebar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { icon: <Home size={24} />, label: 'Home', path: '/' },
    { icon: <Search size={24} />, label: 'Explore', path: '/explore' },
    { icon: <Bell size={24} />, label: 'Notifications', path: '/notifications' },
    { icon: <Mail size={24} />, label: 'Messages', path: '/messages' },
    { icon: <Bookmark size={24} />, label: 'Bookmarks', path: '/bookmarks' },
    { icon: <User size={24} />, label: 'Profile', path: '/profile' },
    { icon: <Settings size={24} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-20 md:w-64 p-4 h-screen sticky top-0">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="mb-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 w-min">
          <Twitter size={28} className="text-primary" />
        </div>
        
        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 ${
                      isActive ? 'font-bold' : ''
                    }`
                  }
                >
                  <span className="mr-4">{item.icon}</span>
                  <span className="hidden md:inline">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Theme toggle */}
        <button 
          onClick={toggleTheme}
          className="flex items-center p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 mb-4"
        >
          {theme === 'dark' ? (
            <>
              <Sun size={24} className="mr-4" />
              <span className="hidden md:inline">Light Mode</span>
            </>
          ) : (
            <>
              <Moon size={24} className="mr-4" />
              <span className="hidden md:inline">Dark Mode</span>
            </>
          )}
        </button>
        
        {/* Tweet button */}
        <button className="btn btn-primary w-12 h-12 md:w-full md:h-auto md:py-3 rounded-full">
          <span className="hidden md:inline">Tweet</span>
          <Twitter size={24} className="md:hidden" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
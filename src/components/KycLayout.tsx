
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { KycSidebar } from './KycSidebar';
import { cn } from '@/lib/utils';
import { Bell, Globe, Search, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function KycLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Handler to toggle the sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <KycSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div 
        className={cn(
          "flex flex-col flex-1 transition-all duration-300 overflow-hidden",
          sidebarOpen ? "ml-64" : "ml-16"
        )}
      >
        {/* Top navbar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="flex h-16 items-center px-4 sm:px-6">
            <div className="flex-1 flex">
              <div className="relative max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 w-full md:w-[300px] rounded-md border border-gray-200 dark:border-gray-700"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <Globe className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          KYC Network &copy; {new Date().getFullYear()} - All rights reserved
        </footer>
      </div>
    </div>
  );
}

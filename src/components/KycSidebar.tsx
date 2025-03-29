
import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  Building2,
  Users,
  FileCheck,
  ArrowRightLeft,
  FileText,
  FileHeart,
  FileSearch,
  FileBarChart2,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function KycSidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const isMobile = useIsMobile();

  const menuItems = [
    { name: 'Dashboard', icon: <BarChart3 className="h-5 w-5" />, path: '/' },
    { name: 'Banks', icon: <Building2 className="h-5 w-5" />, path: '/banks' },
    { name: 'Customers', icon: <Users className="h-5 w-5" />, path: '/customers' },
    { name: 'KYC Credentials', icon: <FileCheck className="h-5 w-5" />, path: '/credentials' },
    { name: 'Transactions', icon: <ArrowRightLeft className="h-5 w-5" />, path: '/transactions' },
    { name: 'Regulations', icon: <FileText className="h-5 w-5" />, path: '/regulations' },
    { name: 'Consents', icon: <FileHeart className="h-5 w-5" />, path: '/consents' },
    { name: 'Data Requests', icon: <FileSearch className="h-5 w-5" />, path: '/data-requests' },
    { name: 'Audit & Reports', icon: <FileBarChart2 className="h-5 w-5" />, path: '/audit' }
  ];

  // Sidebar container classes
  const sidebarClasses = cn(
    "fixed top-0 left-0 h-full bg-sidebar text-sidebar-foreground transition-all duration-300 z-30 shadow-lg flex flex-col",
    isOpen ? "w-64" : "w-16",
    isMobile && !isOpen && "-translate-x-full"
  );
  
  return (
    <>
      <div className={sidebarClasses}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className={cn("flex items-center", !isOpen && "justify-center w-full")}>
            {isOpen && (
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 ml-2">KYC Network</span>
            )}
            {!isOpen && !isMobile && (
              <span className="font-bold text-xl">KYC</span>
            )}
          </div>
          {!isMobile && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleSidebar} 
              className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="flex flex-col gap-1 px-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                  !isOpen && "justify-center px-2"
                )}
              >
                {item.icon}
                {isOpen && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          {isOpen ? (
            <div className="text-xs opacity-70">KYC Network v1.0</div>
          ) : (
            <div className="flex justify-center">
              <span className="text-xs">v1.0</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile menu toggle button - fixed at bottom of screen */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="fixed bottom-4 right-4 z-40 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
      
      {/* Overlay when sidebar is open on mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20" 
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}


import React from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
  label?: string;
}

export function StatusBadge({ status, className, label }: StatusBadgeProps) {
  const getStatusConfig = () => {
    const statusKey = status.toUpperCase();
    
    const configs: Record<string, { bgColor: string, textColor: string }> = {
      'VALID': { bgColor: 'bg-green-100 dark:bg-green-900', textColor: 'text-green-800 dark:text-green-300' },
      'ACTIVE': { bgColor: 'bg-green-100 dark:bg-green-900', textColor: 'text-green-800 dark:text-green-300' },
      'PENDING': { bgColor: 'bg-yellow-100 dark:bg-yellow-900', textColor: 'text-yellow-800 dark:text-yellow-300' },
      'EXPIRED': { bgColor: 'bg-red-100 dark:bg-red-900', textColor: 'text-red-800 dark:text-red-300' },
      'REVOKED': { bgColor: 'bg-gray-100 dark:bg-gray-800', textColor: 'text-gray-800 dark:text-gray-300' },
      'VERIFIED': { bgColor: 'bg-green-100 dark:bg-green-900', textColor: 'text-green-800 dark:text-green-300' },
      'REJECTED': { bgColor: 'bg-red-100 dark:bg-red-900', textColor: 'text-red-800 dark:text-red-300' },
      'FLAGGED': { bgColor: 'bg-orange-100 dark:bg-orange-900', textColor: 'text-orange-800 dark:text-orange-300' },
      // Default
      'DEFAULT': { bgColor: 'bg-gray-100 dark:bg-gray-800', textColor: 'text-gray-800 dark:text-gray-300' }
    };
    
    return configs[statusKey] || configs['DEFAULT'];
  };
  
  const { bgColor, textColor } = getStatusConfig();
  
  return (
    <span 
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        bgColor,
        textColor,
        className
      )}
    >
      {label || status}
    </span>
  );
}

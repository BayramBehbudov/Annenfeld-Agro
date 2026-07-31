import React from 'react';
import * as Icons from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicIcon: React.FC<IconProps> = ({ name, className = 'w-6 h-6', size }) => {
  // Access Lucide icon dynamically
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[name];

  if (!IconComponent) {
    // Fallback to Truck icon if icon name not found
    const FallbackIcon = Icons.Truck;
    return <FallbackIcon className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
};

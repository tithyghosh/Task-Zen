import React from 'react';
import { getPriority } from '../utilities/PriorityConfig';

/**
 * Reusable priority badge.
 *
 * Usage:
 *   <PriorityBadge priority="High" />
 *   <PriorityBadge priority="Medium" size="sm" />
 */
const PriorityBadge = ({ priority, size = 'md' }) => {
  if (!priority) return null;

  const config = getPriority(priority);

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-2',
  };

  const dotSize = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium
        ${config.badge} ${sizeClasses[size]}`}
    >
      <span className={`rounded-full flex-shrink-0 ${config.dot} ${dotSize[size]}`} />
      {config.label}
    </span>
  );
};

export default PriorityBadge;

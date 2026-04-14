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
    sm: 'gap-1.5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]',
    md: 'gap-1.5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]',
    lg: 'gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.18em]',
  };

  const dotSize = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full
        ${config.badge} ${sizeClasses[size]}`}
    >
      <span className={`rounded-full flex-shrink-0 ${config.dot} ${dotSize[size]}`} />
      {config.label}
    </span>
  );
};

export default PriorityBadge;

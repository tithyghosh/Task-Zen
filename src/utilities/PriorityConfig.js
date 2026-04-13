// Single source of truth for all priority colours.
// Import this wherever you need priority-based styling.

export const PRIORITY_CONFIG = {
  High: {
    label: 'High',
    dot: 'bg-red-500',
    badge: 'bg-red-500/15 text-red-400 border border-red-500/30',
    border: 'border-l-red-500',
    ring: 'ring-red-500/20',
    selectText: 'text-red-400',
    glow: 'shadow-red-500/10',
    icon: '🔴',
  },
  Medium: {
    label: 'Medium',
    dot: 'bg-amber-400',
    badge: 'bg-amber-400/15 text-amber-400 border border-amber-400/30',
    border: 'border-l-amber-400',
    ring: 'ring-amber-400/20',
    selectText: 'text-amber-400',
    glow: 'shadow-amber-400/10',
    icon: '🟡',
  },
  Low: {
    label: 'Low',
    dot: 'bg-emerald-400',
    badge: 'bg-emerald-400/15 text-emerald-400 border border-emerald-400/30',
    border: 'border-l-emerald-400',
    ring: 'ring-emerald-400/20',
    selectText: 'text-emerald-400',
    glow: 'shadow-emerald-400/10',
    icon: '🟢',
  },
};

// Fallback for tasks with no priority set
export const PRIORITY_FALLBACK = {
  label: '',
  dot: 'bg-slate-500',
  badge: 'bg-slate-500/15 text-slate-400 border border-slate-500/30',
  border: 'border-l-slate-600',
  ring: 'ring-slate-500/20',
  selectText: 'text-slate-400',
  glow: '',
  icon: '',
};

export const getPriority = (priority) =>
  PRIORITY_CONFIG[priority] ?? PRIORITY_FALLBACK;
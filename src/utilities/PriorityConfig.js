// Single source of truth for all priority colours.
// Import this wherever you need priority-based styling.

export const PRIORITY_CONFIG = {
  High: {
    label: 'High',
    dot: 'bg-rose-400',
    badge: 'border border-rose-400/20 bg-rose-400/10 text-rose-200',
    border: 'border-l-rose-400',
    ring: 'ring-rose-400/20',
    selectText: 'text-rose-300',
    glow: 'shadow-rose-400/10',
    icon: '🔴',
  },
  Medium: {
    label: 'Medium',
    dot: 'bg-sky-300',
    badge: 'border border-sky-400/20 bg-sky-400/10 text-sky-200',
    border: 'border-l-sky-400',
    ring: 'ring-sky-400/20',
    selectText: 'text-sky-200',
    glow: 'shadow-sky-400/10',
    icon: '🔵',
  },
  Low: {
    label: 'Low',
    dot: 'bg-emerald-400',
    badge: 'border border-emerald-400/20 bg-emerald-400/10 text-emerald-200',
    border: 'border-l-emerald-400',
    ring: 'ring-emerald-400/20',
    selectText: 'text-emerald-200',
    glow: 'shadow-emerald-400/10',
    icon: '🟢',
  },
};

// Fallback for tasks with no priority set
export const PRIORITY_FALLBACK = {
  label: '',
  dot: 'bg-slate-500',
  badge: 'border border-slate-500/20 bg-slate-500/10 text-slate-300',
  border: 'border-l-slate-600',
  ring: 'ring-slate-500/20',
  selectText: 'text-slate-300',
  glow: '',
  icon: '',
};

export const getPriority = (priority) =>
  PRIORITY_CONFIG[priority] ?? PRIORITY_FALLBACK;

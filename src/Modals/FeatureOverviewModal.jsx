import React, { useEffect, useMemo } from 'react';
import { FiCheckCircle, FiClock, FiLayers, FiX } from 'react-icons/fi';
import { getTaskDateMeta, isTaskDueSoon } from '../utilities/taskDate';

const PRIORITY_STYLES = {
  High: { dot: 'bg-rose-400', pill: 'border-rose-400/20 bg-rose-400/10 text-rose-200' },
  Medium: { dot: 'bg-sky-400', pill: 'border-sky-400/20 bg-sky-400/10 text-sky-200' },
  Low: { dot: 'bg-emerald-400', pill: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200' },
};

const getPriorityStyle = (priority) =>
  PRIORITY_STYLES[priority] || { dot: 'bg-slate-400', pill: 'border-white/10 bg-white/[0.05] text-slate-300' };

const getDueTone = (due) => {
  if (due?.overdue) return 'border-rose-400/20 bg-rose-400/10 text-rose-200';
  if (due?.today || due?.dueSoon) return 'border-sky-400/20 bg-sky-400/10 text-sky-200';
  return 'border-white/10 bg-white/[0.05] text-slate-300';
};

const FeatureOverviewModal = ({ onClose, tasks = [] }) => {
  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const summary = useMemo(() => {
    const completed = tasks.filter((t) => t.isCompleted);
    const inProgress = tasks.filter((t) => !t.isCompleted);
    const dueSoonTasks = inProgress.filter((t) => isTaskDueSoon(t.dueDate));
    const completionRate = tasks.length ? Math.round((completed.length / tasks.length) * 100) : 0;
    return { total: tasks.length, completed, inProgress, dueSoonTasks, completionRate };
  }, [tasks]);

  const inProgressTimeline = useMemo(() =>
    [...summary.inProgress].sort((a, b) => {
      const aDate = getTaskDateMeta(a.dueDate)?.sortValue ?? Infinity;
      const bDate = getTaskDateMeta(b.dueDate)?.sortValue ?? Infinity;
      if (aDate !== bDate) return aDate - bDate;
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }), [summary.inProgress]);

  const completionAngle = summary.completionRate * 3.6;
  const completedPreview = summary.completed.slice(0, 5);
  const dueSoonPreview = summary.dueSoonTasks.slice(0, 3);

  const spotlightStats = [
    { label: 'Tasks added', value: summary.total, icon: FiLayers },
    { label: 'Completed', value: summary.completed.length, icon: FiCheckCircle },
    { label: 'In progress', value: summary.inProgress.length, icon: FiClock },
  ];

  const spotlightCopy = (() => {
    if (!summary.total) return 'Your board is empty right now. Add a task and this feature preview will start showing live progress automatically.';
    if (!summary.inProgress.length) return 'Everything on the board is complete. TaskZen is showing a clean finish with no remaining work in flight.';
    return `${summary.completed.length} tasks are finished, ${summary.inProgress.length} are still moving, and ${summary.dueSoonTasks.length} need attention soon.`;
  })();

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/78 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed inset-0 z-50 overflow-y-auto px-3 py-4 sm:px-6 sm:py-8">
        <div className="flex min-h-full items-end justify-center sm:items-center">
          <div className="relative w-full max-w-6xl overflow-hidden rounded-[28px] sm:rounded-[32px] border border-white/10 bg-[#08111a] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">

            {/* bg decorations */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_62%)]" />
            <div className="pointer-events-none absolute -right-10 top-14 h-44 w-44 rounded-full bg-sky-400/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 rounded-full bg-emerald-400/8 blur-3xl" />

            {/* header */}
            <div className="relative flex items-start justify-between gap-4 border-b border-white/8 px-5 py-5 sm:px-7">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-sky-300/80">Feature preview</p>
                <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl lg:text-3xl">A cleaner snapshot of your workflow</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  Scan momentum, completed work, and the active timeline without reopening the full board.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition hover:border-white/20 hover:text-white"
                aria-label="Close features modal"
              >
                <FiX size={17} />
              </button>
            </div>

            {/* body — single col on mobile, two cols on lg */}
            <div className="relative grid gap-5 p-4 sm:p-6 lg:grid-cols-[1fr_0.85fr] lg:p-7">

              {/* LEFT COLUMN */}
              <div className="space-y-5 min-w-0">

                {/* Live summary card */}
                <section className="overflow-hidden rounded-[24px] border border-sky-400/14 bg-[linear-gradient(135deg,rgba(56,189,248,0.14),rgba(255,255,255,0.03)_48%,rgba(255,255,255,0.01)_100%)] p-4 sm:p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-200/80">Live summary</p>
                  <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">See the shape of your work in one glance</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300/85">{spotlightCopy}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {dueSoonPreview.length > 0 ? (
                      dueSoonPreview.map((task) => (
                        <span key={task.id} className="rounded-full border border-sky-400/18 bg-sky-400/10 px-3 py-1 text-xs text-sky-100">
                          {task.title}
                        </span>
                      ))
                    ) : (
                      <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-300">
                        Nothing urgent is due soon
                      </span>
                    )}
                  </div>

                  {/* stat cards + donut — stack on mobile, side by side on sm+ */}
                  <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 flex-1 min-w-0">
                      {spotlightStats.map(({ label, value, icon: Icon }) => (
                        <div key={label} className="min-w-0 rounded-2xl border border-white/8 bg-black/20 p-3">
                          <div className="mb-2 flex items-center justify-between gap-1">
                            <span className="min-w-0 text-[10px] uppercase tracking-[0.1em] text-slate-500 leading-tight break-words">{label}</span>
                            <Icon className="shrink-0 text-sky-200/80" size={13} />
                          </div>
                          <p className="text-xl font-semibold text-white sm:text-2xl">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-center sm:justify-end sm:pl-4 shrink-0">
                      <div
                        className="relative flex h-32 w-32 items-center justify-center rounded-full sm:h-36 sm:w-36"
                        style={{ background: `conic-gradient(rgba(103,232,249,0.95) ${completionAngle}deg, rgba(56,189,248,0.14) ${completionAngle}deg 360deg)` }}
                      >
                        <div className="absolute inset-[9px] rounded-full border border-white/8 bg-[#08111a]" />
                        <div className="relative text-center">
                          <p className="text-3xl font-semibold text-white sm:text-4xl">{summary.completionRate}%</p>
                          <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-slate-500">Done</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Completed log */}
                <section className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-300/80">Completed log</p>
                      <h3 className="mt-2 text-lg font-semibold text-white">Finished tasks</h3>
                    </div>
                    <span className="shrink-0 rounded-full border border-emerald-400/18 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                      {summary.completed.length} done
                    </span>
                  </div>

                  {completedPreview.length === 0 ? (
                    <div className="mt-4 rounded-2xl border border-dashed border-white/10 bg-black/15 px-5 py-8 text-center">
                      <p className="text-sm font-medium text-white">No completed tasks yet</p>
                      <p className="mt-2 text-sm leading-6 text-slate-400">Complete a task on the board and it will show up here.</p>
                    </div>
                  ) : (
                    <div className="mt-4 space-y-4">
                      {completedPreview.map((task, index) => {
                        const ps = getPriorityStyle(task.priority);
                        return (
                          <div key={task.id} className={`flex items-start gap-3 ${index !== 0 ? 'border-t border-white/8 pt-4' : ''}`}>
                            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-400/16 bg-emerald-400/10 text-emerald-200">
                              <FiCheckCircle size={15} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="text-sm font-medium text-white/90 line-through decoration-emerald-300/35">{task.title}</p>
                                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${ps.pill}`}>
                                  <span className={`h-1.5 w-1.5 rounded-full ${ps.dot}`} />
                                  {task.priority || 'No priority'}
                                </span>
                              </div>
                              {task.description && (
                                <p className="mt-1 text-sm leading-6 text-slate-400">
                                  {task.description.length > 120 ? `${task.description.slice(0, 120)}...` : task.description}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      {summary.completed.length > completedPreview.length && (
                        <p className="pt-2 text-xs uppercase tracking-[0.22em] text-slate-500">
                          +{summary.completed.length - completedPreview.length} more on the board
                        </p>
                      )}
                    </div>
                  )}
                </section>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-5 min-w-0">

                {/* Active timeline */}
                <section className="rounded-[24px] border border-white/8 bg-[#0b141d]/92 p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-300/80">Active timeline</p>
                      <h3 className="mt-2 text-lg font-semibold text-white">What is in progress right now</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-400">Ordered by due date so you can see what's next.</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium text-slate-300">
                      {summary.inProgress.length} active
                    </span>
                  </div>

                  {inProgressTimeline.length === 0 ? (
                    <div className="mt-4 rounded-2xl border border-dashed border-white/10 bg-black/15 px-5 py-8 text-center">
                      <p className="text-sm font-medium text-white">Nothing is in progress</p>
                      <p className="mt-2 text-sm leading-6 text-slate-400">Add tasks and they will appear here as a focused timeline.</p>
                    </div>
                  ) : (
                    <div className="relative mt-5 pl-7">
                      <div className="absolute left-2.5 top-2 bottom-2 w-px bg-gradient-to-b from-sky-300/70 via-sky-400/24 to-transparent" />
                      <div className="space-y-5">
                        {inProgressTimeline.map((task, index) => {
                          const due = getTaskDateMeta(task.dueDate);
                          const ps = getPriorityStyle(task.priority);
                          const timelineLabel = due?.overdue ? 'Needs attention' : due?.today ? 'Scheduled for today' : due?.dueSoon ? 'Coming up soon' : due ? 'Planned ahead' : 'Waiting for a due date';
                          return (
                            <article key={task.id} className="relative">
                              <div className="absolute -left-7 top-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-sky-400/28 bg-[#08111a] text-[10px] font-semibold text-sky-100">
                                {index + 1}
                              </div>
                              <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${getDueTone(due)}`}>{due?.text ?? 'No due date'}</span>
                                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${ps.pill}`}>
                                    <span className={`h-1.5 w-1.5 rounded-full ${ps.dot}`} />
                                    {task.priority || 'No priority'}
                                  </span>
                                </div>
                                <div>
                                  <h4 className="text-sm font-semibold text-white">{task.title}</h4>
                                  {task.description && (
                                    <p className="mt-1 text-sm leading-6 text-slate-400">
                                      {task.description.length > 140 ? `${task.description.slice(0, 140)}...` : task.description}
                                    </p>
                                  )}
                                </div>
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                  Timeline <span className="ml-1.5 normal-case tracking-normal text-slate-400">{timelineLabel}</span>
                                </p>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </section>

                {/* Timing lens */}
                <section className="rounded-[24px] border border-white/8 bg-black/18 p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-300/80">Timing lens</p>
                      <h3 className="mt-2 text-lg font-semibold text-white">What needs attention soon</h3>
                    </div>
                    <span className="shrink-0 rounded-full border border-sky-400/18 bg-sky-400/10 px-3 py-1 text-xs font-medium text-sky-200">
                      {summary.dueSoonTasks.length} soon
                    </span>
                  </div>

                  {summary.dueSoonTasks.length === 0 ? (
                    <p className="mt-3 text-sm leading-6 text-slate-400">No active tasks due today or in the next few days.</p>
                  ) : (
                    <div className="mt-4 space-y-3">
                      {summary.dueSoonTasks.slice(0, 4).map((task) => {
                        const due = getTaskDateMeta(task.dueDate);
                        return (
                          <div key={task.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-white">{task.title}</p>
                              <p className="mt-0.5 text-xs uppercase tracking-[0.2em] text-slate-500">{task.priority || 'No priority'}</p>
                            </div>
                            <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${getDueTone(due)}`}>
                              {due?.text ?? 'No due date'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureOverviewModal;

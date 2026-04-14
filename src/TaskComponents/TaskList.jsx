import React from 'react';
import { FaStar } from 'react-icons/fa';
import {
  FiCalendar,
  FiCheck,
  FiEdit2,
  FiLayers,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiTrash2,
} from 'react-icons/fi';
import PriorityBadge from '../Components/PriorityBadge';
import { getPriority } from '../utilities/PriorityConfig';
import { getTaskDateMeta } from '../utilities/taskDate';

const EmptyState = ({ action, copy, icon: Icon, title }) => (
  <div className="rounded-[28px] border border-dashed border-white/10 bg-black/20 px-4 py-12 text-center sm:px-6 sm:py-16">
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03] text-sky-300">
      <Icon size={24} />
    </div>
    <h3 className="mt-6 text-xl font-semibold text-white sm:text-2xl">{title}</h3>
    <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-400">{copy}</p>
    {action ? <div className="mt-7">{action}</div> : null}
  </div>
);

const FirstTimeEmptyState = ({ onAddClick }) => (
  <EmptyState
    icon={FiLayers}
    title="Nothing on the board yet"
    copy="Create your first task and the board will turn into a focused workspace with sorting, search, and progress tracking."
    action={
      <button
        type="button"
        onClick={onAddClick}
        className="inline-flex items-center gap-2 rounded-2xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
      >
        <FiPlus size={16} />
        Add your first task
      </button>
    }
  />
);

const FilteredEmptyState = ({ activeFilter, onResetView, searchTerm }) => {
  const title = searchTerm
    ? `No results for "${searchTerm}"`
    : activeFilter === 'completed'
      ? 'No completed tasks yet'
      : activeFilter === 'starred'
        ? 'No starred tasks yet'
        : 'No active tasks right now';

  const copy = searchTerm
    ? 'Try a broader keyword or reset the current view to bring the rest of the board back into focus.'
    : 'Switch the filter or reset the view to see everything again.';

  return (
    <EmptyState
      icon={FiSearch}
      title={title}
      copy={copy}
      action={
        <button
          type="button"
          onClick={onResetView}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/18 hover:bg-white/[0.05]"
        >
          <FiRefreshCw size={15} />
          Reset view
        </button>
      }
    />
  );
};

const getDueClasses = (due) => {
  if (!due) return 'border-white/8 bg-white/[0.04] text-slate-300';
  if (due.overdue) return 'border-rose-400/18 bg-rose-400/10 text-rose-200';
  if (due.today) return 'border-sky-400/24 bg-sky-400/12 text-sky-200';
  if (due.dueSoon) return 'border-sky-400/20 bg-sky-400/10 text-sky-200';
  return 'border-white/8 bg-white/[0.04] text-slate-300';
};

const TaskCard = ({ task, onDelete, onEdit, onFav, onToggleComplete }) => {
  const due = getTaskDateMeta(task.dueDate);
  const priority = getPriority(task.priority);
  const tags = Array.isArray(task.tags) ? task.tags.filter(Boolean) : [];

  return (
    <article
      className={`group relative overflow-hidden rounded-[26px] border border-white/8 border-l-2 ${priority.border} bg-[linear-gradient(180deg,rgba(19,24,34,0.96),rgba(10,14,21,0.96))] p-3.5 shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition duration-200 hover:-translate-y-0.5 hover:border-white/14 sm:p-5 ${
        task.isCompleted ? 'opacity-75' : ''
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-1 gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => onToggleComplete(task.id)}
            title={task.isCompleted ? 'Mark as active' : 'Mark as complete'}
            className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition ${
              task.isCompleted
                ? 'border-emerald-400/18 bg-emerald-400/12 text-emerald-200'
                : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-emerald-400/22 hover:text-emerald-200'
            }`}
          >
            {task.isCompleted ? <FiCheck size={18} strokeWidth={2.5} /> : <span className="h-2.5 w-2.5 rounded-full bg-current" />}
          </button>

          <div className="min-w-0 flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <PriorityBadge priority={task.priority} size="sm" />

              {due && (
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium ${getDueClasses(due)}`}
                >
                  <FiCalendar size={12} />
                  {due.text}
                </span>
              )}

              <span
                className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-medium ${
                  task.isCompleted
                    ? 'border-emerald-400/18 bg-emerald-400/10 text-emerald-200'
                    : 'border-white/8 bg-white/[0.04] text-slate-300'
                }`}
              >
                {task.isCompleted ? 'Completed' : 'In progress'}
              </span>
            </div>

            <h3
              className={`text-lg font-semibold leading-7 sm:text-[1.15rem] ${
                task.isCompleted ? 'text-slate-500 line-through' : 'text-white'
              }`}
            >
              {task.title}
            </h3>

            {task.description && (
              <p className={`mt-2 text-sm leading-7 ${task.isCompleted ? 'text-slate-600' : 'text-slate-400'}`}>
                {task.description.length > 170 ? `${task.description.slice(0, 170)}...` : task.description}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {tags.length > 0 ? (
                tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-[11px] text-slate-400"
                  >
                    #{tag.trim()}
                  </span>
                ))
              ) : (
                <span className="rounded-full border border-dashed border-white/8 px-3 py-1 text-[11px] text-slate-500">
                  No tags yet
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-2 sm:justify-start">
          <button
            type="button"
            onClick={() => onFav(task.id)}
            title={task.isFavourite ? 'Remove from favourites' : 'Mark as favourite'}
            className={`flex h-10 w-10 items-center justify-center rounded-2xl border transition ${
              task.isFavourite
                ? 'border-sky-400/18 bg-sky-400/10 text-sky-300'
                : 'border-white/8 bg-white/[0.03] text-slate-500 hover:border-white/14 hover:text-sky-300'
            }`}
          >
            <FaStar size={13} />
          </button>

          <button
            type="button"
            onClick={() => onEdit(task)}
            title="Edit task"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03] text-slate-400 transition hover:border-white/14 hover:text-white"
          >
            <FiEdit2 size={14} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(task.id)}
            title="Delete task"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-rose-400/12 bg-rose-400/[0.06] text-rose-200 transition hover:border-rose-400/24 hover:bg-rose-400/[0.1]"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      </div>
    </article>
  );
};

const TaskList = ({
  activeFilter,
  allTasksCount,
  onAddClick,
  onDelete,
  onEdit,
  onFav,
  onResetView,
  onToggleComplete,
  searchTerm,
  tasks,
}) => {
  if (allTasksCount === 0) {
    return <FirstTimeEmptyState onAddClick={onAddClick} />;
  }

  if (tasks.length === 0) {
    return <FilteredEmptyState activeFilter={activeFilter} onResetView={onResetView} searchTerm={searchTerm.trim()} />;
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onFav={onFav}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;

import React from 'react'
import { FaStar } from 'react-icons/fa'
import { FiEdit2, FiTrash2, FiCalendar, FiPlus } from 'react-icons/fi'
import PriorityBadge from '../Components/PriorityBadge'
import { getPriority } from '../utilities/PriorityConfig'

// ── Date helper ────────────────────────────────────────────────────
const formatDate = (dateStr) => {
  if (!dateStr) return null
  const date = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = Math.ceil((date - today) / (1000 * 60 * 60 * 24))
  if (diff < 0)  return { text: `${Math.abs(diff)}d overdue`, overdue: true }
  if (diff === 0) return { text: 'Due today',    today: true  }
  if (diff === 1) return { text: 'Due tomorrow'               }
  return { text: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }
}

// ── Empty states ───────────────────────────────────────────────────

// Shown when the user has no tasks at all (first visit or all deleted)
const FirstTimeEmptyState = ({ onAddClick }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-dashed border-white/20 text-4xl select-none">
      📋
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">
      No tasks yet
    </h3>
    <p className="text-sm text-slate-400 max-w-xs mb-6 leading-relaxed">
      You haven't added any tasks. Hit the button below to create your first one.
    </p>
    <button
      onClick={onAddClick}
      className="flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-400 active:scale-95"
    >
      <FiPlus size={15} strokeWidth={2.5} />
      Add your first task
    </button>
  </div>
)

// Shown when tasks exist but none match the current search term
const NoSearchResultsState = ({ searchTerm }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="mb-5 text-4xl select-none">🔍</div>
    <h3 className="text-base font-semibold text-slate-300 mb-1">
      No results for "{searchTerm}"
    </h3>
    <p className="text-sm text-slate-500 max-w-xs">
      Try a different keyword, or search by tag or description.
    </p>
  </div>
)

// ── Task card ──────────────────────────────────────────────────────
const TaskCard = ({ task, onEdit, onDelete, onFav, onToggleComplete }) => {
  const due      = formatDate(task.dueDate)
  const priority = getPriority(task.priority)

  return (
    <div
      className={`
        group relative rounded-xl border-l-4 border border-white/8
        bg-white/[0.03] transition-all duration-200
        hover:border-white/15 hover:shadow-lg
        ${priority.border}
        ${task.isCompleted ? 'opacity-50' : `hover:ring-1 ${priority.ring}`}
      `}
    >
      <div className="flex gap-3 p-4 md:p-5">

        {/* Completion toggle */}
        <button
          onClick={() => onToggleComplete(task.id)}
          title={task.isCompleted ? 'Mark active' : 'Mark complete'}
          className={`
            mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center
            rounded-full border-2 transition-all
            ${task.isCompleted
              ? 'border-emerald-400 bg-emerald-400'
              : 'border-slate-600 bg-transparent hover:border-emerald-400'
            }
          `}
        >
          {task.isCompleted && (
            <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 12 12">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-start justify-between gap-2">
            <h3 className={`font-semibold text-sm md:text-[15px] leading-snug
              ${task.isCompleted ? 'line-through text-slate-500' : 'text-white'}`}>
              {task.title}
            </h3>
            <PriorityBadge priority={task.priority} size="sm" />
          </div>

          {task.description && (
            <p className={`text-xs leading-relaxed mb-3
              ${task.isCompleted ? 'text-slate-600' : 'text-slate-400'}`}>
              {task.description.length > 130
                ? task.description.slice(0, 130) + '…'
                : task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {task.tags.filter(Boolean).map((tag) => (
              <span key={tag}
                className="rounded-md border border-white/8 bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
                #{tag.trim()}
              </span>
            ))}
            {due && (
              <span className={`flex items-center gap-1 text-[10px] font-medium
                ${due.overdue ? 'text-red-400' : due.today ? 'text-amber-400' : 'text-slate-500'}`}>
                <FiCalendar size={10} />
                {due.text}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Hover actions */}
      <div className="absolute right-3 top-3 flex items-center gap-0.5 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        <button onClick={() => onFav(task.id)} title={task.isFavourite ? 'Unstar' : 'Star'}
          className="rounded-lg p-1.5 transition-colors hover:bg-white/10">
          <FaStar size={11} color={task.isFavourite ? '#FBBF24' : '#4B5563'} />
        </button>
        <button onClick={() => onEdit(task)} title="Edit"
          className="rounded-lg p-1.5 text-blue-400 transition-colors hover:bg-white/10 hover:text-blue-300">
          <FiEdit2 size={11} />
        </button>
        <button onClick={() => onDelete(task.id)} title="Delete"
          className="rounded-lg p-1.5 text-red-400 transition-colors hover:bg-white/10 hover:text-red-300">
          <FiTrash2 size={11} />
        </button>
      </div>
    </div>
  )
}

// ── TaskList ───────────────────────────────────────────────────────
const TaskList = ({
  tasks,
  allTasksCount,
  searchTerm,
  onAddClick,
  onEdit,
  onDelete,
  onFav,
  onToggleComplete,
}) => {
  // Case 1: no tasks exist at all → first-time onboarding state
  if (allTasksCount === 0) {
    return <FirstTimeEmptyState onAddClick={onAddClick} />
  }

  // Case 2: tasks exist but search returned nothing
  if (tasks.length === 0 && searchTerm.trim()) {
    return <NoSearchResultsState searchTerm={searchTerm} />
  }

  // Case 3: normal render
  return (
    <div className="space-y-2.5">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onFav={onFav}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  )
}

export default TaskList
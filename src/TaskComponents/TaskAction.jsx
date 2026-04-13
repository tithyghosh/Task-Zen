import React from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
const TaskAction = ( {onAddClick, onDeleteAllClick, totalCount, hasTasks} ) => {
  return (
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-xl font-bold text-white">Your Tasks</h2>
        {hasTasks && (
          <p className="mt-0.5 text-xs text-slate-500">
            {totalCount} task{totalCount !== 1 ? 's' : ''}
          </p>
        )}
      </div>
 
      <div className="flex items-center gap-2">
        <button
          onClick={onAddClick}
          className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber-400 active:scale-95"
        >
          <FiPlus size={15} strokeWidth={2.5} />
          Add Task
        </button>
 
        {hasTasks && (
          <button
            onClick={onDeleteAllClick}
            className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20 active:scale-95"
          >
            <FiTrash2 size={13} />
            Delete All
          </button>
        )}
      </div>
    </div>
  )
}

export default TaskAction

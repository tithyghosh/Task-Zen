import React from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const TaskAction = ({ hasTasks, onAddClick, onDeleteAllClick }) => {
  return (
    <div className="mb-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-sky-300/80">
            Productivity board
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            A sharper command center for the work that matters.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            {hasTasks
              ? 'Search, filter, and update your work from one calm view without the extra dashboard blocks.'
              : 'Start with one task and build a calmer workflow from there.'}
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={onAddClick}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 hover:shadow-[0_14px_34px_rgba(56,189,248,0.22)] active:scale-[0.98] sm:w-auto"
          >
            <FiPlus size={16} strokeWidth={2.5} />
            Add task
          </button>

          {hasTasks && (
            <button
              type="button"
              onClick={onDeleteAllClick}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-400/18 bg-rose-400/8 px-5 py-3 text-sm font-semibold text-rose-200 transition hover:border-rose-400/28 hover:bg-rose-400/12 active:scale-[0.98] sm:w-auto"
            >
              <FiTrash2 size={15} />
              Clear board
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskAction;

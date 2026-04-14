import React, { useState, useEffect } from 'react';
import PriorityBadge from '../Components/PriorityBadge';
import { getPriority, PRIORITY_CONFIG } from '../utilities/PriorityConfig';

const AddTaskModal = ({ onSave, taskToUpdate, onClose }) => {
  const [task, setTask] = useState(
    taskToUpdate || {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      tags: [],
      priority: '',
      dueDate: '',
      isCompleted: false,
      isFavourite: false,
    }
  );

  const isAdd = taskToUpdate === null;

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.classList.add('modal-open');
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('modal-open');
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: name === 'tags'
        ? value.split(',').map((t) => t.trim())
        : value,
    }));
  };

  const priorityConfig = getPriority(task.priority);
  const tagsValue = Array.isArray(task.tags) ? task.tags.join(', ') : task.tags;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[70] overflow-y-auto px-3 pb-6 pt-20 sm:px-6 sm:pb-8 sm:pt-24">
        <div className="flex min-h-full items-start justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave(task, isAdd);
            }}
            className="flex max-h-[calc(100dvh-6rem)] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#191D26] shadow-2xl sm:max-h-[calc(100dvh-7rem)]"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/8 bg-[#191D26] px-4 py-4 sm:px-6 sm:py-5">
              <div className="min-w-0">
                <h2 className="text-base font-bold text-white sm:text-lg">
                  {isAdd ? '✦ New Task' : 'Edit Task'}
                </h2>
                <p className="mt-0.5 text-xs text-slate-300">
                  {isAdd ? 'Fill in the details below' : 'Update your task'}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-white/25 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:space-y-5 sm:px-6 sm:py-6">

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  className="block w-full rounded-lg border border-white/8 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/20"
                  type="text"
                  name="title"
                  placeholder="What needs to be done?"
                  value={task.title}
                  required
                  onChange={handleChange}
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <div className="flex justify-between gap-3">
                  <label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Description
                  </label>
                  <span className="text-xs text-slate-600">
                    {task.description.length}/300
                  </span>
                </div>
                <textarea
                  className="block min-h-[90px] w-full resize-none rounded-lg border border-white/8 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/20"
                  name="description"
                  placeholder="Add some details…"
                  maxLength={300}
                  value={task.description}
                  onChange={handleChange}
                />
              </div>

              {/* Tags + Priority */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Tags
                  </label>
                  <input
                    className="block w-full rounded-lg border border-white/8 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/20"
                    type="text"
                    name="tags"
                    value={tagsValue}
                    onChange={handleChange}
                  />
                  <p className="text-[10px] text-slate-600">Comma separated</p>
                </div>

                {/* Priority select with live color preview */}
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      Priority <span className="text-red-400">*</span>
                    </label>
                    {/* Live badge preview */}
                    {task.priority && (
                      <PriorityBadge priority={task.priority} size="sm" />
                    )}
                  </div>
                  <select
                    className={`block w-full cursor-pointer rounded-lg border bg-white/5 px-3.5 py-2.5 text-sm outline-none transition-all
                      ${task.priority
                        ? `${priorityConfig.selectText} border-white/15 focus:border-white/30`
                        : 'text-slate-500 border-white/8 focus:border-sky-400/50'
                      }`}
                    name="priority"
                    required
                    value={task.priority}
                    onChange={handleChange}
                  >
                    <option value="" className="bg-[#191D26] text-slate-400">
                      Select priority
                    </option>
                    {Object.entries(PRIORITY_CONFIG).map(([key, cfg]) => (
                      <option
                        key={key}
                        value={key}
                        className="bg-[#191D26]"
                        style={{ color: key === 'High' ? '#f87171' : key === 'Medium' ? '#38bdf8' : '#34d399' }}
                      >
                        {cfg.icon}  {cfg.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Due date */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Due Date
                </label>
                <input
                  className="block w-full rounded-lg border border-white/8 bg-white/5 px-3.5 py-2.5 text-sm text-slate-300 outline-none transition-all [color-scheme:dark] focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/20"
                  type="date"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Footer */}
            <div
              className={`flex flex-col-reverse gap-3 border-t px-4 py-4 transition-colors duration-300 sm:flex-row sm:items-center sm:justify-end sm:px-6
                ${task.priority ? `border-t ${priorityConfig.border.replace('border-l-', 'border-t-')}/30` : 'border-white/8'}`}
            >
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-400 transition-colors hover:border-red-600 hover:text-red-400 sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full rounded-lg bg-cyan-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-cyan-300 hover:text-black active:scale-95 sm:w-auto"
              >
                {isAdd ? 'Create Task' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTaskModal;

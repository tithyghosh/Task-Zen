import React, { useEffect, useMemo, useState } from 'react';
import Search from '../TaskComponents/Search';
import TaskAction from '../TaskComponents/TaskAction';
import TaskList from '../TaskComponents/TaskList';
import AddTaskModal from '../Modals/AddTaskModal';
import { getDueDateSortValue, isTaskDueSoon } from '../utilities/taskDate';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
  { id: 'starred', label: 'Starred' },
];

const PRIORITY_ORDER = {
  High: 0,
  Medium: 1,
  Low: 2,
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('taskzen-tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  useEffect(() => {
    localStorage.setItem('taskzen-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const stats = useMemo(() => {
    const active = tasks.filter((task) => !task.isCompleted).length;
    const completed = tasks.filter((task) => task.isCompleted).length;
    const starred = tasks.filter((task) => task.isFavourite).length;
    const dueSoon = tasks.filter((task) => !task.isCompleted && isTaskDueSoon(task.dueDate)).length;

    return {
      total: tasks.length,
      active,
      completed,
      starred,
      dueSoon,
    };
  }, [tasks]);

  const filterCounts = useMemo(
    () => ({
      all: stats.total,
      active: stats.active,
      completed: stats.completed,
      starred: stats.starred,
    }),
    [stats],
  );

  const displayedTasks = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    let filteredTasks = tasks.filter((task) => {
      if (activeFilter === 'active') return !task.isCompleted;
      if (activeFilter === 'completed') return task.isCompleted;
      if (activeFilter === 'starred') return task.isFavourite;
      return true;
    });

    if (term) {
      filteredTasks = filteredTasks.filter(({ title = '', description = '', tags = [] }) => {
        const safeTags = Array.isArray(tags) ? tags : [];
        return (
          title.toLowerCase().includes(term) ||
          description.toLowerCase().includes(term) ||
          safeTags.some((tag) => tag.toLowerCase().includes(term))
        );
      });
    }

    const sortedTasks = [...filteredTasks];

    sortedTasks.sort((a, b) => {
      if (sortBy === 'due') {
        return getDueDateSortValue(a.dueDate) - getDueDateSortValue(b.dueDate);
      }

      if (sortBy === 'priority') {
        const priorityDiff = (PRIORITY_ORDER[a.priority] ?? 99) - (PRIORITY_ORDER[b.priority] ?? 99);
        if (priorityDiff !== 0) return priorityDiff;
        return getDueDateSortValue(a.dueDate) - getDueDateSortValue(b.dueDate);
      }

      if (sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }

      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

    return sortedTasks;
  }, [activeFilter, searchTerm, sortBy, tasks]);

  const handleCloseModal = () => {
    setShowAddModal(false);
    setTaskToUpdate(null);
  };

  const handleOpenAddModal = () => {
    setTaskToUpdate(null);
    setShowAddModal(true);
  };

  const handleAddTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks((prev) => [{ ...newTask, createdAt: new Date().toISOString() }, ...prev]);
    } else {
      setTasks((prev) => prev.map((task) => (task.id === newTask.id ? newTask : task)));
    }

    handleCloseModal();
  };

  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowAddModal(true);
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleDeleteAllClick = () => {
    if (window.confirm('Delete all tasks? This cannot be undone.')) {
      setTasks([]);
    }
  };

  const handleFavourite = (id) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, isFavourite: !task.isFavourite } : task)));
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)));
  };

  const handleResetView = () => {
    setSearchTerm('');
    setActiveFilter('all');
    setSortBy('recent');
  };

  return (
    <section className="relative z-10 pb-24" id="tasks">
      {showAddModal && <AddTaskModal onSave={handleAddTask} taskToUpdate={taskToUpdate} onClose={handleCloseModal} />}

      <div className="mx-auto w-full max-w-6xl px-4 lg:px-6">
        <div className="relative overflow-hidden rounded-[30px] border border-white/8 bg-[#0f141d]/92 px-5 py-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_60%)]" />
          <div className="pointer-events-none absolute -right-10 top-28 h-48 w-48 rounded-full bg-sky-400/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-emerald-400/8 blur-3xl" />

          <div className="relative">
            <TaskAction
              hasTasks={tasks.length > 0}
              onAddClick={handleOpenAddModal}
              onDeleteAllClick={handleDeleteAllClick}
            />

            <Search
              onSearch={setSearchTerm}
              onSortChange={setSortBy}
              resultCount={displayedTasks.length}
              searchTerm={searchTerm}
              sortBy={sortBy}
              totalCount={tasks.length}
            />

            {tasks.length > 0 && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                {FILTERS.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      activeFilter === filter.id
                        ? 'border-sky-400/35 bg-sky-400/12 text-sky-200 shadow-[0_0_0_1px_rgba(56,189,248,0.14)]'
                        : 'border-white/8 bg-white/[0.04] text-slate-300 hover:border-white/15 hover:bg-white/[0.07]'
                    }`}
                  >
                    {filter.label}
                    <span className="ml-2 text-xs text-slate-500">{filterCounts[filter.id]}</span>
                  </button>
                ))}

                {(searchTerm || activeFilter !== 'all' || sortBy !== 'recent') && (
                  <button
                    type="button"
                    onClick={handleResetView}
                    className="rounded-full border border-white/8 px-4 py-2 text-sm text-slate-400 transition hover:border-white/15 hover:text-white"
                  >
                    Reset view
                  </button>
                )}
              </div>
            )}

            <TaskList
              activeFilter={activeFilter}
              allTasksCount={tasks.length}
              onAddClick={handleOpenAddModal}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              onFav={handleFavourite}
              onResetView={handleResetView}
              onToggleComplete={handleToggleComplete}
              searchTerm={searchTerm}
              tasks={displayedTasks}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;

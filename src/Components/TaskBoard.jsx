import React, { useEffect, useMemo, useState } from 'react'
import Search from '../TaskComponents/Search'
import TaskAction from '../TaskComponents/TaskAction'
import TaskList from '../TaskComponents/TaskList'
import AddTaskModal from '../Modals/AddTaskModal'

const TaskBoard = () => {
	// Local storage
	const [tasks, setTasks] = useState(() => {
		try {
			const saved = localStorage.getItem('taskzen-tasks');
			return saved ? JSON.parse(saved) : [];
		} catch{
			return [];
		}
	});
	const [searchTerm, setSearchTerm] = useState('');
	const [showAddModal, setShowAddModal] = useState(false); 
	const [taskToUpdate, setTaskToUpdate] = useState(null);

	// Persists evey change to local storage
	useEffect( () => {
		localStorage.setItem('taskzen-tasks', JSON.stringify(tasks))
	}, [tasks]);
// Derived filtered list
const displayedTasks = useMemo(() => {
	const term = searchTerm.trim().toLowerCase();
	if(!term){
		return tasks;
	}
	return tasks.filter(({title, description, tags}) => {
		return title.toLowerCase().includes(term) || 
			   description.toLowerCase().includes(term) || tags.some((tag) => tag.toLowerCase().includes(term))
	});
}, [tasks, searchTerm]);

// Handlers
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
			setTasks((prev) => [{...newTask, createdAt: new Date().toISOString()}, ...prev]);
		}
		else{
			setTasks((prev) => prev.map((t) => (t.id === newTask.id ? newTask : t)))
		}
		handleCloseModal();
	};

	const handleEditTask = (task) => {
		setTaskToUpdate(task)
		setShowAddModal(true);

	}
	const handleDeleteTask = (taskId) => {
		const tasksAfterDelete = tasks.filter(task => task.id !== taskId);
		setTasks(tasksAfterDelete);
	};
	const handleDeleteAllClick = () =>{
		if (window.confirm('Delete all tasks? This cannot be undone.')) setTasks([])
  };
	

	const handleFavourite = (id) =>{
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isFavourite: !t.isFavourite } : t))
    )
	};
  const handleToggleComplete = (id) =>{
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    )
	};
 
  return (
    <section className="mb-20" id="tasks">
		{showAddModal && <AddTaskModal onSave={handleAddTask} taskToUpdate={taskToUpdate} onClose={handleCloseModal} />}
		<div className="container px-4 lg:px-20">

			{/* Only show search + task board  once at least one tasks exists */}
			{ tasks.length > 0 && (
				// Search bar
		 <Search searchTerm = {searchTerm} onSearch = {setSearchTerm} />
			)}

         {/* Task Bar */}
			<div className="border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-10 md:py-10 shadow-2xl">
				<TaskAction onAddClick={handleOpenAddModal}
				onDeleteAllClick={handleDeleteAllClick}
				totalCount={displayedTasks.length}
				hasTasks = {tasks.length > 0}
				/>
				<TaskList tasks={displayedTasks} 
				onEdit={handleEditTask} onDelete={handleDeleteTask} onFav={handleFavourite}
				allTasksCount={tasks.length}
				searchTerm={searchTerm}
				onAddClick={handleOpenAddModal}
				onToggleComplete={handleToggleComplete}
				/>
			</div>
		</div>
	</section>
  )
}

export default TaskBoard

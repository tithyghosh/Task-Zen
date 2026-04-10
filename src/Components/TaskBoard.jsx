import React, { useState } from 'react'
import Search from '../TaskComponents/Search'
import TaskAction from '../TaskComponents/TaskAction'
import TaskList from '../TaskComponents/TaskList'
import AddTaskModal from '../Modals/AddTaskModal'

const TaskBoard = () => {
	const defaultTask = {
		'id': crypto.randomUUID(),
		'title': "Learn React",
		'description': "I want to learn react within this month to master on frontend development.",
		'tags': ["web", "react", "js"],
		'priority': 'High',
		'isFavourite': true
	}
	const [tasks, setTasks] = useState([defaultTask]);
	const [showAddModal, setShowAddModal] = useState(false); 
	const [taskToUpdate, setTaskToUpdate] = useState(null);

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
			setTasks([...tasks, newTask]);
		}
		else{
			setTasks(
			   tasks.map((task) => {
					if(task.id === newTask.id){
						return newTask;
					} else{
						return task;
					}
				})
			)
		}
		handleCloseModal();
	};

	const handleEditTask = (task) => {
		setTaskToUpdate(task)
		setShowAddModal(true);

	}
	const handleDeleteTask = (taskId) => {
		const tasksAfterDelete = tasks.filter(task => task.id !== taskId);
		setTasks(tasksAfterDelete)
	}
	const handleDeleteAllClick = () =>{
		tasks.length = 0;
		setTasks([...tasks]);
	}

	const handleFavourite = (taskId) =>{
		const taskIndex = tasks.findIndex(task => task.id === taskId);
		const newTask = [...tasks];
		newTask[taskIndex].isFavourite = !newTask[taskIndex].isFavourite;
		setTasks(newTask)
	}

	const handleSearch = (searchTerm) =>{
		const filtered = tasks.filter((task) =>
		task.title.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setTasks([...filtered]);
	}
  return (
    <section className="mb-20" id="tasks">
		{showAddModal && <AddTaskModal onSave={handleAddTask} taskToUpdate={taskToUpdate} onClose={handleCloseModal} />}
		<div className="container">
			{/* Search Box starts */}
         <Search onSearch={handleSearch}/>

         {/* Task Bar */}
			<div className="border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-20 md:py-10">
				<TaskAction onAddClick={handleOpenAddModal}
				onDeleteAllClick={handleDeleteAllClick}
				/>
				<TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} onFav={handleFavourite}/>
			</div>
		</div>
	</section>
  )
}

export default TaskBoard

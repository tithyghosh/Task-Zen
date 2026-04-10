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
	
	const handleAddTask = (newTask) => {
		setTasks([
			...tasks,
			newTask
		]);
		setShowAddModal(false);
	}

  return (
    <section className="mb-20" id="tasks">
		{showAddModal && <AddTaskModal onSave={handleAddTask} />}
		<div className="container">
			{/* Search Box starts */}
         <Search/>

         {/* Task Bar */}
			<div className="border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-20 md:py-10">
				<TaskAction onAddClick={() => setShowAddModal(true)}/>
				<TaskList tasks={tasks}/>
			</div>
		</div>
	</section>
  )
}

export default TaskBoard

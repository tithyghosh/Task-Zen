import React, { useState } from 'react'

const AddTaskModal = ({ onSave }) => {
   const [task, setTask] = useState({
      id: crypto.randomUUID(),
      title: '',
      description: '',
      tags: [],
      priority: '', 
      isFavourite: false 
   })

   const handleChange = (event) =>{
      const name = event.target.name;
      let value = event.target.value;
      if(name === 'tags') {
         value = value.split(",");
      }
      setTask({
         ...task,
         [name]: value
      });
   }
  return (
   <>
   <div className='fixed inset-0 z-40 bg-black/70'></div>
   <form
      className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[#FEFBFB]/20 bg-[#191D26] p-6 shadow-2xl max-md:px-4 lg:p-8"
    >
      <h2
        className="mb-7 text-center text-2xl font-bold text-white lg:mb-8 lg:text-[28px]"
      >
        Add New Task
      </h2>

    
      <div className="space-y-6 text-white lg:space-y-7">
     
        <div className="space-y-2 lg:space-y-3">
          <label htmlFor="title">Title</label>
          <input
            className="block w-full rounded-md border border-transparent bg-[#2D323F] px-3 py-2.5 outline-none focus:border-blue-500"
            type="text"
            name="title"
            id="title" value={task.title}
            required
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2 lg:space-y-3">
          <label htmlFor="description">Description</label>
          <textarea
            className="block min-h-[110px] w-full rounded-md border border-transparent bg-[#2D323F] px-3 py-2.5 outline-none focus:border-blue-500 lg:min-h-[130px]"
            type="text"
            name="description"
            id="description" 
            value={task.description}
            required
            onChange={handleChange}
          ></textarea>
        </div>
        <div
          className="grid-cols-2 gap-x-4 max-md:space-y-6 md:grid lg:gap-x-8"
        >
          
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="tags">Tags</label>
            <input
              className="block w-full rounded-md border border-transparent bg-[#2D323F] px-3 py-2.5 outline-none focus:border-blue-500"
              type="text"
              name="tags"
              id="tags"
              required
              value={task.tags}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="priority">Priority</label>
            <select
              className="block w-full cursor-pointer rounded-md border border-transparent bg-[#2D323F] px-3 py-2.5 outline-none focus:border-blue-500"
              name="priority"
              id="priority"
              required
              value={task.priority}
              onChange={handleChange}
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="mt-10 flex justify-center lg:mt-12">
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
          onClick={() => onSave(task)}
        >
          Create new Task
        </button>
      </div>
    </form>
    </>
  )
}

export default AddTaskModal

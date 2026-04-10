import React from "react";
import { FaStar } from "react-icons/fa";
const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed border-separate border-spacing-0">
        <colgroup>
          <col className="w-12" />
          <col className="w-55 md:w-65" />
          <col />
          <col className="w-55 md:w-70" />
          <col className="w-30" />
          <col className="w-35" />
        </colgroup>
        <thead>
          <tr className="[&>th]:px-4 [&>th]:pb-6 [&>th]:text-left [&>th]:text-sm [&>th]:font-semibold [&>th]:capitalize">
            <th className="text-center"></th>
            <th>Title</th>
            <th>Description</th>
            <th>Tags</th>
            <th>Priority</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="border-b border-[#2E3443] [&>td]:px-4 [&>td]:py-4 [&>td]:align-top"
            >
              <td>
                {task.isFavourite ? (
                  <FaStar color="yellow" />
                ) : (
                  <FaStar color="gray" />
                )}
              </td>
              <td className="font-medium text-[#F4F5F6]">{task.title}</td>
              <td>
                <div className="max-w-[65ch] text-sm leading-6 text-slate-300">
                  {task.description}
                </div>
              </td>
              <td>
                <ul className="flex flex-wrap gap-1.5">
                  {task.tags.map((tag) => (
                    <li key={tag}>
                      <span className="inline-block h-5 whitespace-nowrap rounded-[45px] bg-[#FE1A1AB5] px-2.5 text-sm capitalize text-[#F4F5F6]">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </td>
              <td>{task.priority}</td>
              <td>
                <div className="flex items-center gap-3">
                  <button className="text-red-500"
                  onClick={() => onDelete(task.id)}
                  >
                     Delete
                  </button>
                  <button className="text-blue-500"
                  onClick={() => onEdit(task)}
                  >
                     Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;

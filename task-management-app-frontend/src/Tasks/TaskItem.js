// src/components/Tasks/TaskItem.js
import React from 'react';
import { useDeleteTaskMutation } from '../../features/api/apiSlice';

const TaskItem = ({ task }) => {
  const [deleteTask] = useDeleteTaskMutation();

  const handleDelete = async () => {
    try {
      await deleteTask(task._id).unwrap();
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  return (
    <div className="border rounded p-4 mb-4">
      <h3 className="text-xl">{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={handleDelete} className="bg-red-500 text-white py-1 px-3 rounded">
        Delete
      </button>
    </div>
  );
};

export default TaskItem;

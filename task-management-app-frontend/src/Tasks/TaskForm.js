// src/components/Tasks/TaskForm.js
import React, { useState, useCallback } from 'react';
import { useAddTaskMutation } from '../features/api/apiSlice';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [addTask, { isLoading, isError, error }] = useAddTaskMutation();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await addTask({ title, description }).unwrap();
        setTitle('');
        setDescription('');
      } catch (err) {
        console.error('Failed to create task:', err);
      }
    },
    [title, description, addTask]
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        {isError && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded" disabled={isLoading}>
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;

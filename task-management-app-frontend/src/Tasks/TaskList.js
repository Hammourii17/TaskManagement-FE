// src/components/Tasks/TaskList.js
import React from 'react';
import { useFetchTasksQuery } from '../../features/api/apiSlice';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { data: tasks = [], error, isLoading } = useFetchTasksQuery();

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p className="text-red-500">Failed to load tasks: {error.data}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Your Tasks</h2>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;

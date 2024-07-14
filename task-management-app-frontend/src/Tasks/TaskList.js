import React, { useState } from 'react';
import { useFetchTasksQuery } from '../../features/api/apiSlice';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { data: tasks = [], error, isLoading } = useFetchTasksQuery();
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === 'priority') {
      return a.priority.localeCompare(b.priority);
    } else if (sort === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else {
      return 0;
    }
  });

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p className="text-red-500">Failed to load tasks: {error.data}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Your Tasks</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter tasks"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded py-2 px-3 mr-2"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded py-2 px-3"
        >
          <option value="">Sort by</option>
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>
      {sortedTasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;

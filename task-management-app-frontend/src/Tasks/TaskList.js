import React, { useMemo , useState } from 'react';
import { useFetchTasksQuery } from '../features/api/apiSlice';
import TaskItem from './TaskItem';
import { filterTasks, sortTasks } from '../utils/taskUtils';
const TaskList = () => {
  const { data: tasks = [], error, isLoading } = useFetchTasksQuery(filter , sortBy);
  const [filter, setFilter] = useState({completed:'',dueDate:'',priority:''});
  const [sortBy, setSortBy] = useState('date');


  
  const filteredTasks = useMemo(() => filterTasks(tasks, filter), [tasks, filter]);
  const sortedTasks = useMemo(() => sortTasks(filteredTasks, sortBy), [filteredTasks, sortBy]);
  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p className="text-red-500">Failed to load tasks: {error.data}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl">Your Tasks</h2>
        <div className="flex space-x-4">
          <select value={filter} onChange={e => setFilter(e.target.value)} className="px-2 py-1 border rounded">
            <option value="">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-2 py-1 border rounded">
            <option value="date">Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>
      <ul>
        {sortedTasks.map(task => (
          <TaskItem key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
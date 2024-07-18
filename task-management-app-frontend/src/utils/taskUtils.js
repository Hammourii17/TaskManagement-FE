export const filterTasks = (tasks, filter) => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.status === 'completed');
      case 'pending':
        return tasks.filter(task => task.status === 'pending');
      default:
        return tasks;
    }
  };
  
  export const sortTasks = (tasks, sortBy) => {
    switch (sortBy) {
      case 'date':
        return tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'priority':
        return tasks.sort((a, b) => a.priority - b.priority);
      default:
        return tasks;
    }
  };
  
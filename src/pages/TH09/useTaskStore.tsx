import { useState, useEffect } from 'react';
import { Task } from './data.d';

export const useTaskStore = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => setTasks([...tasks, task]);
  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };
  const deleteTask = (id: string) => setTasks(tasks.filter(t => t.id !== id));

  return { tasks, setTasks, addTask, updateTask, deleteTask };
};
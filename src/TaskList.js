import React, { useState, useEffect } from 'react';
import Task from './Task';
import TaskForm from './TaskForm';

function TaskList() {
	const [tasks, setTasks] = useState([]); // Initialize tasks state as an empty array
	const [taskToEdit, setTaskToEdit] = useState(null); // Initialize taskToEdit state as null

	// useEffect hook to load tasks from localStorage when component mounts
	useEffect(() => {
		const storedTasks = JSON.parse(localStorage.getItem('tasks'));
		if (storedTasks) {
			setTasks(storedTasks);
		}
	}, []);

	// useEffect hook to save tasks to localStorage whenever tasks state changes
	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	// Function to add a new task
	const addTask = (task) => {
		setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
	};

	// Function to edit an existing task
	const editTask = (editedTask) => {
		setTasks(tasks.map((task) => (task.id === editedTask.id ? editedTask : task)));
		setTaskToEdit(null); // Reset taskToEdit to null after editing
	};

	// Function to toggle task completion status
	const toggleComplete = (id) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
	};

	// Function to start editing a task
	const startEditing = (task) => {
		setTaskToEdit(task); // Set taskToEdit to the task to be edited
	};

	// Function to delete a task
	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id)); // Remove the deleted task from tasks array
	};

	return (
		<div>
			<TaskForm addTask={addTask} editTask={editTask} taskToEdit={taskToEdit} />
			{tasks.map((task) => (
				<Task
					key={task.id}
					task={task}
					toggleComplete={toggleComplete}
					startEditing={startEditing}
					deleteTask={deleteTask}
				/>
			))}
		</div>
	);
}

export default TaskList;

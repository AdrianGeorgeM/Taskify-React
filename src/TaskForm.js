import React, { useState } from 'react';
import { useEffect } from 'react';

function TaskForm({ addTask, editTask, taskToEdit }) {
	// Initialize state with taskToEdit or an empty object
	const [task, setTask] = useState(
		taskToEdit || { title: '', description: '', priority: '', dueDate: '' }
	);

	// Function to handle changes in input fields and update state
	const handleChange = (e) => {
		const { name, value } = e.target;
		setTask({ ...task, [name]: value });
	};

	// useEffect hook to update task state when taskToEdit prop changes
	useEffect(() => {
		if (taskToEdit) {
			setTask(taskToEdit);
		}
	}, [taskToEdit]);

	// Function to handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		if (taskToEdit) {
			editTask(task); // If editing, call editTask function
		} else {
			addTask(task); // If adding, call addTask function
			setTask({ title: '', description: '', priority: '', dueDate: '' }); // Reset form fields
		}
	};

	return (
		<form onSubmit={handleSubmit} className='task-form'>
			<input
				type='text'
				name='title'
				value={task.title}
				onChange={handleChange}
				placeholder='Title'
				required
				className='input-field'
			/>
			<textarea
				name='description'
				value={task.description}
				onChange={handleChange}
				placeholder='Description'
				required
				className='textarea-field'
			></textarea>
			<select
				name='priority'
				value={task.priority}
				onChange={handleChange}
				required
				className='select-field'
			>
				<option value=''>Select Priority</option>
				<option value='High'>High</option>
				<option value='Medium'>Medium</option>
				<option value='Low'>Low</option>
			</select>
			{/* <input
				type='date'
				name='dueDate'
				value={task.dueDate}
				onChange={handleChange}
				required
				className='input-field'
			/> */}
			<button type='submit' className='submit-button'>
				{taskToEdit ? 'Update' : 'Add'}
			</button>
		</form>
	);
}

export default TaskForm;

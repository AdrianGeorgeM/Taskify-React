import React from 'react';

function Task({ task, toggleComplete, startEditing, deleteTask }) {
	return (
		<div className={`task ${task.completed ? 'completed' : ''}`}>
			<input
				type='checkbox'
				checked={task.completed}
				onChange={() => toggleComplete(task.id)}
				className='task-checkbox'
			/>
			<div className='task-details'>
				<span className='task-title'>{task.title}</span>
				<span className='task-description'>{task.description}</span>
				<span className='task-priority'>{task.priority}</span>
				{/* <span className='task-dueDate'>{task.dueDate}</span> */}
			</div>
			<div className='task-actions'>
				<button onClick={() => startEditing(task)} className='edit-button'>
					Edit
				</button>
				<button onClick={() => deleteTask(task.id)} className='delete-button'>
					Delete
				</button>
			</div>
		</div>
	);
}

export default Task;

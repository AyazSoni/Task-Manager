// Import necessary dependencies and assets
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskAdd from './TaskAdd';
import '../ALL CSS/TaskList.css'; 
import deletes from "../Images/trash.svg";
import { deleteTask, setFilter, toggleTask } from '../Redux/TaskSlice';

// TaskList component
const TaskList = () => {
  // State and dispatch setup
  const { tasks, filter } = useSelector((state) => state.tasks);
  const [activeFilter, setActiveFilter] = useState('all');
  const [addTask, setAddTask] = useState(0);
  const dispatch = useDispatch();

  // Handle task deletion
  const handleDelete = (taskId) => {
    console.log(tasks);
    console.log("id :" + taskId);
    dispatch(deleteTask(taskId));
  };

  // Handle filter change
  const handleFilter = (selectedFilter) => {
    setActiveFilter(selectedFilter);
    dispatch(setFilter(selectedFilter));
  };

  // Handle checkbox change
  const handleCheckboxChange = (taskId) => {
    dispatch(toggleTask(taskId));
  };

  // Handle adding a new task
  const handleAddTask = () => {
    setAddTask(1);
  };

  // Filter tasks based on the selected filter
  const filteredTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'incomplete':
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  // Render the TaskList component
  return (
    <>
      <div className="main">
        <div className="header-container">
          <h3 className="header"> Task Manager </h3>
        </div>
        <div className="navbar">
          {/* Filter buttons */}
          <button onClick={() => handleFilter('all')} className={`btn ${activeFilter === 'all' ? 'active-btn' : ''}`}>ALL</button>
          <button onClick={() => handleFilter('completed')} className={`btn ${activeFilter === 'completed' ? 'active-btn' : ''}`}>COMPLETED</button>
          <button onClick={() => handleFilter('incomplete')} className={`btn ${activeFilter === 'incomplete' ? 'active-btn' : ''}`}>INCOMPLETED</button>
        </div>
        <div className="task-container">
          {/* Render filtered tasks */}
          {filteredTasks().map((task, index) => (
            <div key={index} >
              <div className="todo-row">
                {/* Checkbox for task completion */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCheckboxChange(task.id)}
                />
                {/* Task title */}
                <span className="task">{task.title}</span>
                {/* Delete task button */}
                <span onClick={() => handleDelete(task.id)} className="delete-task"> <img src={deletes} alt="delete" /> </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Render TaskAdd component  when click + */}
      <TaskAdd show={addTask} setShow={setAddTask} />
      <div className="add-button-holder">
        {/* Button to add a new task */}
        <button className="Add-btn" onClick={handleAddTask}>+</button>
      </div>
    </>
  );
};

// Export the TaskList component
export default TaskList;

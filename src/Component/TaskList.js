// Import necessary dependencies and assets
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskAdd from './TaskAdd';
import '../ALL CSS/TaskList.css'; 
import deletes from "../Images/trash.svg";
import edit from "../Images/pencil-square.svg";
import { deleteTask, setFilter, toggleTask } from '../Redux/TaskSlice';

// TaskList component
const TaskList = () => {
  // State and dispatch setup
  const { tasks, filter } = useSelector((state) => state.tasks);
  const [activeFilter, setActiveFilter] = useState('all');
  const [addTask, setAddTask] = useState(0);
  const [edit_id, set_edit_id] = useState("");
  const [edit_title, set_edit_title] = useState("");
  const dispatch = useDispatch();

  // Handle task deletion
  const handleDelete = (taskId) => {
    console.log("id :" + taskId);
    dispatch(deleteTask(taskId));
  };
  // handle edit taskI
  const handleEdit = (task) => {
    setAddTask(2);
    set_edit_id(task.id);
    set_edit_title(task.title);
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
                <span onClick={() => handleDelete(task.id)} className="delete-edit-task"> <img src={deletes} alt="delete" /> </span>
                {/* edit task button */}
                <span onClick={() => handleEdit(task)} className="delete-task"> <img src={edit} alt="edit" /> </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Render TaskAdd component  when click + */}
      <TaskAdd show={addTask} setShow={setAddTask} edit_id ={edit_id} edit_title={edit_title}   />
      <div className="add-button-holder">
        {/* Button to add a new task */}
        <button className="Add-btn" onClick={handleAddTask}>+</button>
      </div>
    </>
  );
};

// Export the TaskList component
export default TaskList;

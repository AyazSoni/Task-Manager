// Import necessary dependencies and assets
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../Redux/TaskSlice';
import cancel from "../Images/x.svg";
import "../ALL CSS/TaskAdd.css";

// TaskAdd component
const TaskAdd = (props) => {
  // State to manage the task input
  const [task, setTask] = useState('');
  // Redux dispatch function
  const dispatch = useDispatch();

  // Handle changes in the task input
  const handleTask = (event) => {
    if (event.target.value !== task) {
      setTask(event.target.value);
    }
  };

  // Reset the task input and close the form
  const reset = () => {
    setTask('');
    props.setShow(0);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Dispatch action to add a new task
    dispatch(addTask({ id: uuidv4(), title: task, completed: false }));
    // Reset the task input and close the form
    reset();
  };

  return (
    <div>
    {/* this content will only show when user click on add button means props.show = 1  */}
      {props.show === 1 && (
        <div className="add-task-container">
          <div className="add-task-main">
            <div className="add-task-head">
              {/* Form title and close add task component */}
              <p className="title">Create a task</p>
              <button onClick={() => reset()}>
                <img className="cancel-image" src={cancel} alt="" />
              </button>
            </div>

            {/* Take task from user*/}
            <form onSubmit={handleSubmit}>
              <input
                className="todo-input"
                type="text"
                onChange={handleTask}
                value={task}
                placeholder="Be productive"
              />

              <input className="todo-button" type="submit" value="Add" />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Export the TaskAdd component
export default TaskAdd;

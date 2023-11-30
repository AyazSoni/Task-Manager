// Import necessary dependencies and assets 
 import { v4 as uuidv4 } from 'uuid'; 
 import React, { useState , useEffect  } from 'react'; 
 import { useDispatch , useSelector  } from 'react-redux';
 import { addTask , editTask } from '../Redux/TaskSlice'; 
 import cancel from "../Images/x.svg"; 
 import "../ALL CSS/TaskAdd.css"; 

 // TaskAdd component 
 const TaskAdd = (props) => { 
     
   // State to manage the task input and if edit button is click the default value is edit task title 
   const [task, setTask] = useState(props.show === 1 ? "" : props.edit_title  );

  useEffect(() => {
    setTask(props.show === 1 ? "" : props.edit_title);
   }, [props.show, props.edit_title]);
   
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
  
  /* edit title payload */
  const edit = {
    editId : props.edit_id,
    NewTask : task,
  }
  
  /* edit title dispatch */
  const handleEdit = (event) => { 
    event.preventDefault(); 
    dispatch(editTask(edit));
    reset();
  }
  
   return ( 
     <div> 
     {/* this content will only show when user click on add button means props.show = 1  */} 
       {props.show >=  1 && ( 
        
         <div className="add-task-container"> 
           <div className="add-task-main"> 
             <div className="add-task-head"> 
               {/* Form title and close add task component */} 
               <p className="title">
                {props.show === 1 ? "Create a task" : "Update task"}
               </p> 
               <button onClick={() => reset()}> 
                 <img className="cancel-image" src={cancel} alt="" /> 
               </button> 
             </div> 
  
             {/* Take task from user*/} 
            <form onSubmit={props.show === 1 ? handleSubmit : handleEdit}>
               <input 
                 className="todo-input" 
                 type="text" 
                 onChange={ handleTask } 
                 value={task}
                 placeholder="Be productive" 
               /> 
  
               <input className="todo-button" type="submit" value={props.show === 1 ? "Add" : "edit"} /> 
             </form> 
           </div> 
         </div> 
       )} 
     </div> 
   ); 
 }; 
  
 // Export the TaskAdd component 
 export default TaskAdd;
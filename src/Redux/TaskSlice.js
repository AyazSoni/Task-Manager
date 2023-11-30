// TaskSlice.js
import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  // Reducer Name
  name: 'tasks',

  // Initial State
  initialState: {
    tasks: [],  // Array to store tasks
    filter: 'all',  // Default filter setting
  },
  
  // Reducers (Actions)
  reducers: {
    
    // Add a new task to the tasks array
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    
    // Delete a task based on the provided taskId
    deleteTask: (state, action) => {
      const taskIdToDelete = action.payload;
  
      // Filter out the task to be deleted
      state.tasks = state.tasks.filter((task) => task.id !== taskIdToDelete);
      
    },
    
    // Set the filter to determine which tasks to display
    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    // Toggle the completion status of a task based on taskId
    toggleTask: (state, action) => {
      const taskId = action.payload;
      
      const taskToUpdate = state.tasks.find((task) => task.id === taskId);
      // Toggle the completion status
      taskToUpdate.completed = !taskToUpdate.completed;
    },
    
    // edit task 
    editTask : (state , action ) => {
      console.log("new" +action.payload.NewTask );
      const index = state.tasks.findIndex( task => task.id === action.payload.editId);
      console.log(index);
      if (index !== -1) {
        state.tasks[index].title =  action.payload.NewTask;
        
      }
    }
  }
});

// Exporting actions and reducer
export const { addTask, deleteTask, setFilter, toggleTask , editTask } = taskSlice.actions;
export default taskSlice.reducer;

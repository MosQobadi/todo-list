import { createSlice, nanoid } from "@reduxjs/toolkit";

const saveToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload);
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      },
      prepare({ title, description, category }) {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
            category,
            status: "pending",
          },
        };
      },
    },

    updateTask: (state, action) => {
      const { id, title, description, category } = action.payload;
      const existingTask = state.tasks.find((task) => task.id === id);
      if (existingTask) {
        existingTask.title = title;
        existingTask.description = description;
        existingTask.category = category;
        saveToLocalStorage(state.tasks);
      }
    },

    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    toggleTaskStatus(state, action) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.status = task.status === "pending" ? "completed" : "pending";
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
  },
});

export const { addTask, deleteTask, toggleTaskStatus, updateTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;

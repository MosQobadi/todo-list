import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/tasksSlice";

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error loading from localStorage", e);
    return [];
  }
};

const preloadedState = {
  tasks: {
    tasks: loadFromLocalStorage(),
  },
};

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState,
});

export default store;

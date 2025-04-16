import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTask, toggleTaskStatus } from "../features/tasks/tasksSlice";
import {
  Container,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import TaskList from "../components/TaskList";

const categories = ["All", "Work", "Personal", "Education", "Health", "Other"];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null); // Track task to delete
  const tasks = useSelector((state) => state.tasks.tasks);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const filteredTasks =
    selectedCategory === "All"
      ? tasks
      : tasks.filter((task) => task.category === selectedCategory);

  const handleDeleteConfirmation = (task) => {
    setTaskToDelete(task);
    setIsDialogOpen(true);
  };

  const handleDelete = () => {
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete.id));
      setIsDialogOpen(false);
    }
  };

  const onToggleTaskStatus = (taskId) => {
    // Dispatch the action to toggle the task status
    dispatch(toggleTaskStatus(taskId));
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
        mb={2}
      >
        <Typography variant="h4">Task Manager</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/task/new")}
        >
          Add Task
        </Button>
      </Box>

      {/* Filter Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="filter-category-label">Filter by Category</InputLabel>
        <Select
          labelId="filter-category-label"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          label="Filter by Category"
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Filtered Task List */}
      <TaskList
        tasks={filteredTasks}
        onDeleteClick={handleDeleteConfirmation}
        onToggleTaskStatus={onToggleTaskStatus} // Pass the function to TaskList
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;

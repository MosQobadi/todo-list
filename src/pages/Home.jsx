import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
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
  TextField,
} from "@mui/material";
import TaskList from "../features/tasks/TaskList";
import GitHubIcon from "@mui/icons-material/GitHub";

const categories = ["All", "Work", "Personal", "Education", "Health", "Other"];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const tasks = useSelector((state) => state.tasks.tasks);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Filter tasks based on category and search query
  const filteredTasks = tasks.filter((task) => {
    const matchesCategory =
      selectedCategory === "All" || task.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "All" ||
      (selectedStatus === "Completed" && task.status === "completed") ||
      (selectedStatus === "Pending" && task.status === "pending");

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      task.title.toLowerCase().includes(searchLower) ||
      task.description.toLowerCase().includes(searchLower) ||
      task.category.toLowerCase().includes(searchLower);

    return matchesCategory && matchesStatus && matchesSearch;
  });

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
        <Typography
          sx={{
            fontSize: {
              xs: "1.8rem",
              sm: "2rem",
              md: "2.5rem",
            },
            fontWeight: 600,
          }}
        >
          <Link
            to="https://github.com/MosQobadi/todo-list"
            target="_blank"
            rel="noopener noreferrer"
            // className="link-no-visited"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <GitHubIcon sx={{ fontSize: 40, marginRight: 3 }} />
          </Link>
          Task Manager
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/task/new")}
        >
          Add Task
        </Button>
      </Box>

      {/* Search Bar */}
      <TextField
        label="Search Tasks"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        margin="normal"
      />

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
      <FormControl fullWidth margin="normal">
        <InputLabel id="filter-status-label">Filter by Status</InputLabel>
        <Select
          labelId="filter-status-label"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          label="Filter by Status"
        >
          {["All", "Pending", "Completed"].map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Filtered Task List */}
      {tasks.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary" mt={4}>
          You don’t have any tasks yet. Start by clicking the “Add Task” button
          above.
        </Typography>
      ) : filteredTasks.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary" mt={4}>
          No tasks found matching your filters or search.
        </Typography>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onDeleteClick={handleDeleteConfirmation}
          onToggleTaskStatus={onToggleTaskStatus}
        />
      )}

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

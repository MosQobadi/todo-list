import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addTask, updateTask } from "../features/tasks/tasksSlice";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const TaskDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const isNew = id === "new";

  const taskToEdit = useSelector((state) =>
    state.tasks.tasks.find((task) => task.id === id)
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const categories = ["Work", "Personal", "Education", "Health", "Other"];
  const [category, setCategory] = useState("Work");

  useEffect(() => {
    if (!isNew && taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setCategory(taskToEdit.category || "Work"); // Default if not set
    }
  }, [isNew, taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // const payload = ;

    if (isNew) {
      dispatch(addTask({ title, description, category }));
    } else {
      dispatch(updateTask({ id, ...{ title, description, category } }));
    }

    navigate("/");
  };

  // If editing an invalid ID
  if (!isNew && !taskToEdit) {
    return (
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h6" align="center">
            Task not found
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h5" gutterBottom>
          {isNew ? "Add New Task" : "Edit Task"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button type="submit" variant="contained">
              {isNew ? "Add Task" : "Update Task"}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default TaskDetails;

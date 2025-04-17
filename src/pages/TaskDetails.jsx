import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { addTask, updateTask, deleteTask } from "../features/tasks/tasksSlice";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!isNew && taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setCategory(taskToEdit.category || "Work");
    }
  }, [isNew, taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (isNew) {
      dispatch(addTask({ title, description, category }));
    } else {
      dispatch(updateTask({ id, title, description, category }));
    }

    navigate("/");
  };

  const handleDelete = () => {
    dispatch(deleteTask(id));
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
        <Typography
          sx={{
            fontSize: {
              xs: "1.8rem",
              sm: "2rem",
              md: "2.5rem",
            },
            fontWeight: 600,
          }}
          variant="h5"
          gutterBottom
        >
          <Link to={"/"} style={{ marginRight: "2rem" }}>
            <ArrowBackIcon></ArrowBackIcon>
          </Link>
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

          <Box
            display="flex"
            justifyContent={isNew ? "flex-end" : "space-between"}
            mt={3}
          >
            {!isNew && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => setIsDialogOpen(true)}
              >
                Delete Task
              </Button>
            )}
            <Button type="submit" variant="contained">
              {isNew ? "Add Task" : "Update Task"}
            </Button>
          </Box>
        </form>
      </Box>

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
          <Button></Button>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TaskDetails;

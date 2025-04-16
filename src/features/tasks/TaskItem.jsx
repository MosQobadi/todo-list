import React from "react";
import { Checkbox, IconButton, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTaskStatus } from "./tasksSlice";
import { useNavigate } from "react-router-dom";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = () => {
    dispatch(toggleTaskStatus(task.id));
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteTask(task.id));
  };

  const handleNavigate = () => {
    navigate(`/task/${task.id}`);
  };

  return (
    <ListItem
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        alignItems: {
          xs: "flex-start",
          sm: "center",
        },
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Checkbox
          checked={task.status === "completed"}
          onChange={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
          sx={{ mr: 1 }}
        />
        <ListItemText
          primary={task.title}
          secondary={`Category: ${task.category}`}
          sx={{
            flexGrow: 1,
            cursor: "pointer",
            textDecoration:
              task.status === "completed" ? "line-through" : "none",
          }}
          onClick={handleNavigate}
        />
        <IconButton
          edge="end"
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </ListItem>
  );
};

export default TaskItem;

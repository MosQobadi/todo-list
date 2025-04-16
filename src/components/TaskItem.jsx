import React from "react";
import { Checkbox, IconButton, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTaskStatus } from "../features/tasks/tasksSlice";
import { useNavigate } from "react-router-dom";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = () => {
    dispatch(toggleTaskStatus(task.id));
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // prevent triggering navigation
    dispatch(deleteTask(task.id));
  };

  const handleNavigate = () => {
    navigate(`/task/${task.id}`);
  };

  return (
    <ListItem
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
      onClick={handleNavigate}
    >
      <Checkbox
        checked={task.status === "completed"}
        onChange={handleToggle}
        onClick={(e) => e.stopPropagation()} // prevent checkbox click from triggering navigation
      />
      <ListItemText
        primary={task.title}
        secondary={
          <>
            {task.description && (
              <>
                {task.description} <br />
              </>
            )}
            <strong>Category:</strong> {task.category}
          </>
        }
        sx={{
          textDecoration: task.status === "completed" ? "line-through" : "none",
        }}
      />
      <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default TaskItem;

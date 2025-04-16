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

  const handleDelete = () => {
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
      }}
      primary={task.title}
      secondary={`${task.description} — [${task.category}]`}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <Checkbox checked={task.status === "completed"} onChange={handleToggle} />
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
        onClick={handleNavigate}
        sx={{
          cursor: "pointer",
          textDecoration: task.status === "completed" ? "line-through" : "none",
        }}
      />
    </ListItem>
  );
};

export default TaskItem;

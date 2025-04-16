import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const TaskList = ({ tasks, onDeleteClick, onToggleTaskStatus }) => {
  const navigate = useNavigate();

  const handleTaskClick = (id) => {
    navigate(`/task/${id}`);
  };

  return (
    <List>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          divider
          onClick={() => handleTaskClick(task.id)}
          sx={{ cursor: "pointer" }}
        >
          <ListItemText
            primary={task.title}
            secondary={`Category: ${task.category}`}
            sx={{
              textDecoration:
                task.status === "completed" ? "line-through" : "none",
            }}
          />
          <Checkbox
            checked={task.status === "completed"}
            onClick={(e) => e.stopPropagation()}
            onChange={() => onToggleTaskStatus(task.id)}
            color="primary"
          />
          <IconButton
            edge="end"
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick(task);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;

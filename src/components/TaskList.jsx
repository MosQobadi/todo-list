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
          button // This makes the list item clickable
          onClick={() => handleTaskClick(task.id)} // Navigate to task details
        >
          <ListItemText
            primary={task.title}
            secondary={`Category: ${task.category}`}
          />
          <Checkbox
            checked={task.status === "completed"}
            onChange={() => onToggleTaskStatus(task.id)} // Toggle status on click
            color="primary"
          />
          <IconButton
            edge="end"
            color="error"
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigating to task details
              onDeleteClick(task); // Trigger delete confirmation
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

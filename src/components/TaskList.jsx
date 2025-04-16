import React from "react";
import { useSelector } from "react-redux";
import { List, Typography } from "@mui/material";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  if (!tasks.length) {
    return (
      <Typography variant="h6" align="center">
        No tasks available
      </Typography>
    );
  }

  return (
    <List>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </List>
  );
};

export default TaskList;

import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleAddTask = () => {
    navigate("/task/new");
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" align="center" gutterBottom>
          To-Do List
        </Typography>

        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" onClick={handleAddTask}>
            Add Task
          </Button>
        </Box>

        <TaskList />
      </Box>
    </Container>
  );
};

export default Home;

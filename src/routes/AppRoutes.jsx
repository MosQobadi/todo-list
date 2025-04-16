import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import TaskDetails from "../pages/TaskDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/task/:id" element={<TaskDetails />} />
    </Routes>
  );
};

export default AppRoutes;

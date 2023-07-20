import Reset from "./components/Reset";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import LeaveRequests from "./components/employee-components/LeaveRequests";
import EmployeeDashboard from "./components/employee-components/Dashbaord";
import Login from "./components/Login";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/leave-requests" element={<LeaveRequests />} />
        <Route
          exact
          path="/employee-dashboard"
          element={<EmployeeDashboard />}
        />
        <Route exact path="/reset" element={<Reset />} />
      </Routes>
    </Router>
  );
};
export default App;

import React, { useState } from "react";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import LeaveRequests from "./components/employee-components/LeaveRequests";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>

        <Route
          exact
          path="/"
          element={<Login />}
        />
<Route exact path="/leave-requests" element={<LeaveRequests />} />
     </Routes>
    </Router>
  );
};
export default App;

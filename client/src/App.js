import React, { useState } from "react";
import Login from "./components/employee-components/Login";
import Reset from "./components/employee-components/Reset";
import EmployeeDashboard from "./components/employee-components/Dashboard";
import Profile from "./components/employee-components/Profile";
import Timesheet from "./components/employee-components/Timesheet";
import Leaves from "./components/employee-components/Leaves";
import AdminDashboard from "./components/admin-components/Dashboard";
import ShortLeaveForm from "./components/employee-components/ShortLeave";
import Employees from "./components/admin-components/Employees";
import LeaveRequests from "./components/admin-components/LeaveRequests";
import Navbar from "./components/employee-components/Navbar";
import Calendar from "./components/employee-components/Calendar";

import { ToastContainer } from "react-toastify";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <ToastContainer />
      {/* {loggedIn && <Navbar />} */}
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={<Login setLoggedIn={setLoggedIn} />}
        />
        <Route exact path="/reset" element={<Reset />} />
        <Route
          exact
          path="/emp-dashboard"
          element={<EmployeeDashboard />}
        />
        <Route
          exact
          path="/admin-dashboard"
          element={
            <AdminDashboard setLoggedIn={setLoggedIn} />
          }
        />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/emp-leaves" element={<Leaves />} />
        <Route exact path="/short-leave" element={<ShortLeaveForm />} />
        <Route exact path="/employees" element={<Employees />} />
        <Route exact path="/leave-requests" element={<LeaveRequests />} />
        <Route exact path="/timesheet" element={<Calendar />} />
      </Routes>
    </Router>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/admin-components/Navbar"
import Login from "./components/Login";
import AdminLeaveRequests from "./components/admin-components/AdminLeaveRequests";
import EmployeeDashboard from "./components/employee-components/Dashboard";
import AdminDashboard from "./components/admin-components/Dashboard";
import Employees from "./components/admin-components/Employees";
import Profile from "./components/Profile";
import Reset from "./components/Reset";
import { auth } from "./firebase";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      <ToastContainer />
      {loggedIn && <Navbar onLogout={handleLogout} />}
      <Routes>
        {loggedIn && <Route path="/" element={<AdminDashboard />} />}
        {!loggedIn && <Route path="/" element={<Login onLogin={handleLogin} />} />}
        <Route exact path="/leave-requests" element={<AdminLeaveRequests />} />
        <Route exact path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route exact path="/admin-dashboard" element={<AdminDashboard />} />
        <Route exact path="/employees" element={<Employees />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;

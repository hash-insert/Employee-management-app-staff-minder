import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/admin-components/Navbar"
import Login from "./components/Login";
import LeaveRequests from "./components/employee-components/LeaveRequests";
import EmployeeDashboard from "./components/employee-components/Dashboard";
import AdminDashboard from "./components/admin-components/Dashboard";
import Employees from "./components/admin-components/Employees";
import Profile from "./components/Profile";
import Reset from "./components/Reset";
import { auth } from "./firebase"; // Import your firebase instance

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setLoading(false); // Set loading to false when the state is determined
    });

    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  if (loading) {
    // You can display a loading spinner here if needed
    return <div>Loading...</div>;
  }

  // Function to handle successful login and set loggedIn to true
  const handleLogin = () => {
    setLoggedIn(true);
  };

  // Function to handle successful logout and set loggedIn to false
  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      <ToastContainer />
      {loggedIn && <Navbar onLogout={handleLogout} />} {/* Include the Navbar component if logged in */}
      <Routes>
        {/* If logged in, redirect to the appropriate dashboard */}
        {loggedIn && <Route path="/" element={<AdminDashboard />} />}
        {/* If not logged in, show the login page */}
        {!loggedIn && <Route path="/" element={<Login onLogin={handleLogin} />} />}
        <Route exact path="/leave-requests" element={<LeaveRequests />} />
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

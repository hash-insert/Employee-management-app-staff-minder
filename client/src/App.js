import React from "react";
import EmployeeDashboard from "./components/employee-components/Dashbaord";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const App = () => {

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route
          exact
          path="/employee-dashboard"
          element={
            <EmployeeDashboard  />
          }
        />
      </Routes>
    </Router>
  );
};
export default App;
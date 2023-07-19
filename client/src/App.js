import React, { useState } from "react";
import Login from "./components/Login";
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
          path="/"
          element={<Login />}
        />
     </Routes>
    </Router>
  );
};
export default App;
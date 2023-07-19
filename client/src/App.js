import React  from "react";
import Reset from "./components/Reset";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route exact path="/reset" element={<Reset />} />
      </Routes>
    </Router>
  );
};
export default App;
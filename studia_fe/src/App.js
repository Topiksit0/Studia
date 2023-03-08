import React from "react";
import Home from "./components/home";
import Login from './components/login';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  NavLink,
} from "react-router-dom";

import './App.css';



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

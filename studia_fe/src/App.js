import React from "react";
import Home from "./components/home";
import Login from './components/login';
import Register from './components/register';
import Courses from './components/coursesHome'
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';

import store from './store';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  NavLink,
} from "react-router-dom";



function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="" element={<Navigate to="/home" />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/courses" element={<Courses />}></Route>
          </Routes>
        </div>
      </Router>
    </Provider>


  );
}

export default App;

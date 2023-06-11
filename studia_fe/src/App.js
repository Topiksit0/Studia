import React from "react";
import Home from "./components/home";
import Login from './components/login';
import Register from './components/register';
import Courses from './components/coursesHome'
import Configuration from './components/configurationsHome'
import Verify from './components/verify'
import Course from './components/courseInside'
import CourseSubsection from './components/courseInsideSubsection'
import Events from './components/eventsHome'
import Qualifications from './components/qualificationsHome'
import EventsCalendar from './components/eventsCalendarHome'
import EventsNews from './components/eventsNewsHome'
import ReactDOM from "react-dom/client";
import { Provider, connect } from 'react-redux';

import { useEffect } from 'react';
import { checkAuthenticated, load_user } from './actions/auth';

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
            <Route path="" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/courses" element={<Courses />}></Route>
            <Route path="/configuration" element={<Configuration />}></Route>
            <Route path="/activate/:uid/:token" element={<Verify />} />
            <Route path="/courses/:id/" element={<Course />}></Route>
            <Route path="/events/timeline" element={<Events />}></Route>
            <Route path="/events/calendar" element={<EventsCalendar />}></Route>
            <Route path="/events/news" element={<EventsNews />}></Route>
            <Route path="/courses/:id/:section/:subsection/" element={<CourseSubsection />}></Route>
            <Route path="/qualifications" element={<Qualifications />}></Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import './App.css';

import CreateRoom from "./pages/CreateRoom";
import Room from "./pages/Room";
import Rooms from "./pages/Rooms";
import Welcome from "./pages/Welcome";

export default function App() {
  return (
    <Router>
      <div>
        <div>{/* ... */}</div>

        <Routes>
          <Route path="/create">
            <CreateRoom />
          </Route>
          <Route path="/rooms/:id">
            <Room />
          </Route>
          <Route path="/rooms">
            <Rooms />
          </Route>
          <Route path="/">
            <Welcome />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
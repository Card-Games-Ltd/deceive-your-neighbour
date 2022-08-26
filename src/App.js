import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.css';

import CreateRoom from "./pages/CreateRoom";
import Room from "./pages/Room";
import Rooms from "./pages/Rooms";
import Welcome from "./pages/Welcome";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/create" element={<CreateRoom />}></Route>
          <Route path="/rooms/:id" element={<Room />}></Route>
          <Route path="/rooms" element={<Rooms />}></Route>
          <Route path="/" element={<Welcome />}></Route>
        </Routes>
      </div>
    </Router>
  );
}
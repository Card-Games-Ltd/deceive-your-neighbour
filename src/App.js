import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.css';

import Room from "./pages/Room";
import Welcome from "./pages/Welcome";
import Create from "./pages/Create"

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/rooms/:id" element={<Room />}></Route>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/create" element={<Create />}></Route>
        </Routes>
      </div>
    </Router>
  );
}
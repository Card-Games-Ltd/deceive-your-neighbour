import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.css';

import Room from "./pages/Room";
import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/rooms/:id" element={<Room />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </Router>
  );
}
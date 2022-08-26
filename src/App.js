import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.css';

import Room from "./pages/Room";
import Welcome from "./pages/Welcome";

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const addUser = (attributes) => {
    if (!user) {
      setUser(attributes);
      localStorage.setItem('user', JSON.stringify(attributes));
    }
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/rooms/:id" element={<Room />}></Route>
          <Route path="/" element={<Welcome user={user} addUser={addUser} />}></Route>
        </Routes>
      </div>
    </Router>
  );
}
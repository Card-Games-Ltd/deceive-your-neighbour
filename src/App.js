import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.css';

import Room from "./pages/Room";
import Welcome from "./pages/Welcome";
import Create from "./pages/Create";
import RoomsList from "./pages/RoomsList";


export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const addUser = (attributes) => {
    if (!user) {
      setUser(attributes);
      localStorage.setItem('user', JSON.stringify(attributes));
    }
  }

  useEffect(() => {
    if (user && user.avatar) {
      document.documentElement.style.setProperty('--avatar-image', `url(${user.avatar})`);
    }
  }, [user]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/rooms/:id" element={<Room user={user} />}></Route>
          <Route path="/create" element={<Create user={user} />}></Route>
          <Route path="/rooms" element={<RoomsList user={user} />}></Route>
          <Route path="/" element={<Welcome user={user} addUser={addUser} />}></Route>
        </Routes>
      </div>
    </Router>
  );
}
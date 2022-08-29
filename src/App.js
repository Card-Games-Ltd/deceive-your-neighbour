import React, {useEffect, useState, createContext} from "react";
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
import Game from "./pages/Game";

export const UserContext = createContext();

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
      <UserContext.Provider value={user}>
      <div className="App">
        <Routes>
          <Route path="/rooms/:id/game" element={<Game />}></Route>
          <Route path="/rooms/:id" element={<Room />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/rooms" element={<RoomsList />}></Route>
          <Route path="/" element={<Welcome addUser={addUser} />}></Route>
        </Routes>
      </div>
      </UserContext.Provider>
    </Router>
  );
}
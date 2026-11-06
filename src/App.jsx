import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Game from './pages/Game';
import HowToPlay from './pages/HowToPlay';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';


function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#1A3320', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

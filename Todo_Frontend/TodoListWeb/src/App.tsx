// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;

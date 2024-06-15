// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;

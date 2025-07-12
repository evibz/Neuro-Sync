// src/App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AnimatedRoutes from './routes/AnimatedRoutes';
import './chartSetup'; // <-- just import, no export needed

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
// src/App.jsx
import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import PrimaryHero from './components/primaryhero';
import SecondaryHero from './components/secondaryhero';
function App() {
  return (
    <div className="App">
      <Navbar />
      <PrimaryHero />
      <SecondaryHero />
    </div>
  );
}

export default App;

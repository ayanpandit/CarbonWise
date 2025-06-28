import React from 'react'
import './App.css'
import { Rocket } from "lucide-react";
import Hero from "./components/hero";  // Fixed: Proper import with capital H
function App() {
  return (
    <div className="App">
      <Hero />
    </div>
  )
}

export default App
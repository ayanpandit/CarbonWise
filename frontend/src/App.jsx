// src/App.jsx
import React from 'react';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/navbar';
import PrimaryHero from './components/primaryhero';
import CauseCard from './components/causecard';
import ToolExplanation from './components/toolexplanation';
import MockCarbonTrail from './components/mockcarbontrail';
import ActionTipList from './components/actiontiplist';
import ImpactVisualizer from './components/impactvisualizer';
import SubscribeCTA from './components/subscribecta';
import Footer from './components/footer';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <PrimaryHero />
        <CauseCard />
        <ToolExplanation />
        <MockCarbonTrail />
        <ActionTipList />
        <ImpactVisualizer />
        <SubscribeCTA />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;

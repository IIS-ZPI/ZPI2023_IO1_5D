import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SessionAnalysis from './components/SessionAnalysis';
import StatisticalMeasures from './components/StatisticalMeasures';
import ChangeDistribution from './components/change-distribution/ChangeDistribution';
import Sidebar from './components/Sidebar';
import Flags from './assets/flags.png'
import { CurrencyProvider } from './contexts/CurrencyContext';

const App: React.FC = () => {
  return (
    <CurrencyProvider>
      <Router basename="/ZPI2023_IO1_5D">
        <div className="app">
          <header className="header">
            <h2>GLOBE</h2>
          </header>
          <div className="main">
            <Sidebar />
            <div className="main-content">
              <div className="image-container">
                <img src={Flags} alt="Flags" />
              </div>
              <div className="page-content">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/session-analysis" element={<SessionAnalysis />} />
                  <Route path="/statistical-measures" element={<StatisticalMeasures />} />
                  <Route path="/change-distribution" element={<ChangeDistribution />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </CurrencyProvider>
  );
};

export default App;

import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Flags from './assets/flags.png';
import ChangeDistribution from './components/ChangeDistribution';
import Dashboard from './components/Dashboard';
import SessionAnalysis from './components/SessionAnalysis';
import Sidebar from './components/Sidebar';
import StatisticalMeasures from './components/StatisticalMeasures';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { StatisticsProvider } from './contexts/StatisticsContext';

const App: React.FC = () => {
  return (
    <CurrencyProvider>
      <StatisticsProvider>
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
      </StatisticsProvider>
    </CurrencyProvider>
  );
};

export default App;

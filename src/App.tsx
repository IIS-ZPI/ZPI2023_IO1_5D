import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Flags from "./assets/flags.png";
import ChangeDistribution from "./components/change-distribution/ChangeDistribution";
import Dashboard from "./components/Dashboard";
import SessionAnalysis from "./components/session_analysis/SessionAnalysis";
import Sidebar from "./components/Sidebar";
import StatisticalMeasures from "./components/StatisticalMeasures";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { StatisticsProvider } from "./contexts/StatisticsContext";

const App: React.FC = () => {
  return (
    <div className="m-0 p-0 bg-white font-sans text-default_text">
      <CurrencyProvider>
        <StatisticsProvider>
          <Router basename="/ZPI2023_IO1_5D">
            <div className="flex flex-col h-screen">
              <header className="bg-white text-blue p-2 text-left text-2xl border-b border-gray_for_text">
                <h2 className="m-2 font-bold">GLOBE</h2>
              </header>
              <div className="flex flex-1">
                <Sidebar />
                <div className="flex flex-col flex-1 items-center">
                  <div className="w-full flex justify-center mb-5">
                    <img
                      className="max-w-full h-auto"
                      src={Flags}
                      alt="Flags"
                    />
                  </div>
                  <div className="w-full m-0">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route
                        path="/session-analysis"
                        element={<SessionAnalysis />}
                      />
                      <Route
                        path="/statistical-measures"
                        element={<StatisticalMeasures />}
                      />
                      <Route
                        path="/change-distribution"
                        element={<ChangeDistribution />}
                      />
                    </Routes>
                  </div>
                </div>
              </div>
            </div>
          </Router>
        </StatisticsProvider>
      </CurrencyProvider>
    </div>
  );
};

export default App;

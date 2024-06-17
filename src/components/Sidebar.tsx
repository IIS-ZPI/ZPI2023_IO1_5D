import React from 'react';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '../assets/dashboard.png';
import DashboardGrayIcon from '../assets/dashboard_gray.png';
import SessionAnalysisIcon from '../assets/session_analysis.png';
import SessionAnalysisGrayIcon from '../assets/session_analysis_gray.png';
import StatisticalMeasuresIcon from '../assets/statistical_measures.png';
import StatisticalMeasuresGrayIcon from '../assets/statistical_measures_gray.png';
import ChangeDistributionIcon from '../assets/change_distribution.png';
import ChangeDistributionGrayIcon from '../assets/change_distribution_gray.png';

const Sidebar: React.FC = () => {
  const getIcon = (activeIcon: string, grayIcon: string, isActive: boolean) => {
    const iconName = isActive ? activeIcon : grayIcon;
    return <img src={iconName} alt="icon" className="h-6" />;
  };

  return (
    <div className="w-64 bg-light_gray p-5 flex flex-col">
      <ul className="list-none p-0 flex-1 font-bold">
        <li className="mt-4">
          <NavLink
            className={({ isActive }) =>
              `no-underline flex items-center ${isActive ? 'text-default_text' : 'text-gray_for_text'}`}
            to="/"
          >
            {({ isActive }) => (
              <>
                {getIcon(DashboardIcon, DashboardGrayIcon, isActive)}
                Dashboard
              </>
            )}
          </NavLink>
        </li>
        <li className="mt-6">
          <NavLink
            className={({ isActive }) =>
              `no-underline flex items-center ${isActive ? 'text-default_text' : 'text-gray_for_text'}`}
            to="/session-analysis"
          >
            {({ isActive }) => (
              <>
                {getIcon(SessionAnalysisIcon, SessionAnalysisGrayIcon, isActive)}
                Session Analysis
              </>
            )}
          </NavLink>
        </li>
        <li className="mt-6">
          <NavLink
            className={({ isActive }) =>
              `no-underline flex items-center ${isActive ? 'text-default_text' : 'text-gray_for_text'}`}
            to="/statistical-measures"
          >
            {({ isActive }) => (
              <>
                {getIcon(StatisticalMeasuresIcon, StatisticalMeasuresGrayIcon, isActive)}
                Statistical Measures
              </>
            )}
          </NavLink>
        </li>
        <li className="mt-6">
          <NavLink
            className={({ isActive }) =>
              `no-underline flex items-center ${isActive ? 'text-default_text' : 'text-gray_for_text'}`}
            to="/change-distribution"
          >
            {({ isActive }) => (
              <>
                {getIcon(ChangeDistributionIcon, ChangeDistributionGrayIcon, isActive)}
                Change Distribution
              </>
            )}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

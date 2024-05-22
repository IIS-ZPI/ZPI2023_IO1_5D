import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/session-analysis">Session Analysis</Link></li>
        <li><Link to="/statistical-measures">Statistical Measures</Link></li>
        <li><Link to="/change-distribution">Change Distribution</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;

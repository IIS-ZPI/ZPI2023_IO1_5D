import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-48 bg-light_gray p-5 flex flex-col">
      <ul className="list-none p-0 flex-1">
        <li><Link to="/">Dashboard</Link></li>
        <li className='mt-4'><Link className='no-underline flex items-centers' to="/session-analysis">Session Analysis</Link></li>
        <li className='mt-4'><Link className='no-underline flex items-centers' to="/statistical-measures">Statistical Measures</Link></li>
        <li className='mt-4'><Link className='no-underline flex items-centers' to="/change-distribution">Change Distribution</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;

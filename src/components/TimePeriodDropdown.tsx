import React from 'react';

const TimePeriodDropdown: React.FC = () => {
  return (
    <div className="relative w-64">
      <label htmlFor="time-period" className="block text-gray-700 text-sm font-bold mb-2">
        Time period
      </label>
      <div className="relative">
        <select
          id="time-period"
          className="h-10 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option>Switch period</option>
          <option>7 days</option>
          <option>30 days</option>
          <option>90 days</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M7 10l5 5 5-5H7z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TimePeriodDropdown;

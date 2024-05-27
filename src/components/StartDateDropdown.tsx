import React from 'react';

const StartDateDropdown: React.FC = () => {
  return (
    <div className="relative w-64">
      <label htmlFor="start-date" className="block text-gray-700 text-sm font-bold mb-2">
        Starting date
      </label>
      <input
        type="date"
        id="start-date"
        className="h-10 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default StartDateDropdown;

import React, { useState } from 'react';

interface StartDateDropdownProps {
  setStartingDate: (date: string) => void;
  getDefaultStartingDate: () => string;
}

const StartDateDropdown: React.FC<StartDateDropdownProps> = ({ setStartingDate, getDefaultStartingDate }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setInputValue("");
      setStartingDate(getDefaultStartingDate());
    } else {
      setInputValue(value);
      setStartingDate(value);
    }
  };

  return (
    <div className="relative w-64">
      <label htmlFor="start-date" className="block text-gray-700 text-sm font-bold mb-2">
        Starting date
      </label>
      <input
        type="date"
        id="start-date"
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        value={inputValue}
        onChange={handleChange}
        placeholder="Select a date"
      />
    </div>
  );
};

export default StartDateDropdown;

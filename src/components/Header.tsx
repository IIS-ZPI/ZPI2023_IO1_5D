import React from 'react';

interface HeaderProps {
  currency: string;
  startingDate: string;
  timePeriod: string;
}

const Header: React.FC<HeaderProps> = ({ currency, startingDate, timePeriod }) => {
  return (
    <div className="flex justify-between items-center mb-8 border-b border-gray_for_text">
      <h1 className="text-2xl font-bold">{currency}</h1>
      <div className="text-xl font-medium">{startingDate} - {timePeriod}</div>
    </div>
  );
};

export default Header;
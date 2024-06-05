import React from 'react';

interface HeaderProps {
  currency: string;
  startingDate: string;
  endDate: string;
}

const Header: React.FC<HeaderProps> = ({ currency, startingDate, endDate }) => {
  return (
    <div className="flex justify-between items-center mb-8 border-b border-gray_for_text">
      <h1 className="text-2xl font-bold">{currency}</h1>
      <div className="text-xl font-medium">{startingDate} - {endDate}</div>
    </div>
  );
};

export default Header;
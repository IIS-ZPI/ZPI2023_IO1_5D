import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-8 border-b border-gray_for_text">
      <h1 className="text-2xl font-bold">EUR</h1>
      <div className="text-xl font-medium">2023-20-03 - 2024-20-03</div>
    </div>
  );
};

export default Header;
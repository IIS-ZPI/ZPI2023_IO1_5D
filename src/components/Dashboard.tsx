import React from 'react';
import { useCurrency } from '../contexts/CurrencyContext';

const Dashboard: React.FC = () => {
  const { selectedCurrency, setSelectedCurrency } = useCurrency();

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  };

  return (
    <>
      <h2>Select currency</h2>
      <select value={selectedCurrency} onChange={handleCurrencyChange}>
        <option value="USD">USD - US Dollar</option>
        <option value="CAD">CAD - Canadian Dollar</option>
        <option value="EUR">EUR - Euro</option>
        <option value="GBP">GBP - British Pound</option>
        <option value="NZD">NZD - New Zealand Dollar</option>
      </select>
    </>
  );
};

export default Dashboard;

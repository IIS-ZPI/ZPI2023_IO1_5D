import React from 'react';
import { useCurrency } from '../contexts/CurrencyContext';

const Dashboard: React.FC = () => {
  const { selectedCurrency, setSelectedCurrency, currencies, loading } = useCurrency();

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  };

  return (
    <>
      <h2>Select currency</h2>
      {loading ? (
        <p>Loading currencies...</p>
      ) : (
        <select value={selectedCurrency} onChange={handleCurrencyChange}>
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default Dashboard;

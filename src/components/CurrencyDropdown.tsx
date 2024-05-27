import React from 'react';
import { useCurrency } from '../contexts/CurrencyContext';

const CurrencyDropdown: React.FC = () => {
  const { selectedCurrency, setSelectedCurrency, currencies, loading } = useCurrency();

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  };


  return (
    <div className="relative w-64">
      <label htmlFor="currency" className="block text-gray-700 text-sm font-bold mb-2">
        Currency
      </label>
      <div className="relative">
      {loading ? (
        <p>Loading currencies...</p>
      ) : (
        <>
          <select
            id="currency"
            className="h-10 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            value={selectedCurrency} onChange={handleCurrencyChange}>
            {
              currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>))
            }
          </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </div>
        </>
      )}
      </div>
    </div>
  );
};

export default CurrencyDropdown;

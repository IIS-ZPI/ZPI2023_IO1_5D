import React, { useEffect, useState } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';
import { Statistics, useStatistics } from '../contexts/StatisticsContext';

const StatisticalMeasures: React.FC = () => {
  const {  selectedCurrency, setSelectedCurrency, currencies, loading, setLoading } = useCurrency();
  const { getStatistics } = useStatistics();

  const getDefaultStartingDate = () => {
    const today = new Date();
    const lastMonth = new Date(today.setMonth(today.getMonth() - 1));

    const year = lastMonth.getFullYear();
    const month = String(lastMonth.getMonth() + 1).padStart(2, '0');
    const day = String(lastMonth.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const getEndDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const [startingDate, setStartingDate] = useState(getDefaultStartingDate);
  const [timePeriod, setTimePeriod] = useState(getEndDate);
  const [endDate, setEndDate] = useState(getEndDate);


  const [inputValue, setInputValue] = useState("");
  const [statistics, setStatistics] = useState<Statistics | null>(null);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  };

  const handleTimePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartingDate
  };

  const handleStartingDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setInputValue("");
      setStartingDate(getDefaultStartingDate());
    } else {
      setInputValue(value);
      setStartingDate(value);
    }
  };

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const stats = await getStatistics(selectedCurrency, startingDate, endDate);
        setStatistics(stats);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [selectedCurrency, getStatistics]);


  if (loading) {
    return <p>Loading...</p>;
  }

  if (!statistics) {
    return <p>No statistical data available.</p>;
  }

  return (
    <div className='size-fit' >
      <div className="flex justify-between items-center mb-8 border-b border-gray_for_text">
        <h1 className="text-2xl font-bold">{selectedCurrency}</h1>
        <div className="text-xl font-medium">{startingDate} - {endDate}</div>
      </div>
      <div className="flex justify-between mb-8">
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
        <div className="flex">
          <div className="relative w-64">
            <label htmlFor="start-date" className="block text-gray-700 text-sm font-bold mb-2">
              Starting date
            </label>
            <input
            type="date"
            id="start-date"
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            value={inputValue}
            onChange={handleStartingDateChange}
            placeholder="Select a date"/>
          </div>
          <div className="relative w-64">
            <label htmlFor="time-period" className="block text-gray-700 text-sm font-bold mb-2">
              Time period
            </label>
            <div className="relative">
              <select
                id="time-period"
                className="h-10 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleTimePeriodChange}
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
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold">Parameters</h2>
          <div className="mt-4">
            <p className="mb-2">Mode:</p>
            <p className="mb-2">Median:</p>
            <p className="mb-2">Standard deviation:</p>
            <p className="mb-2">Coefficient of variation:</p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold">Values</h2>
          <div className="mt-4">
            <input
              type="text"
              readOnly
              className="mb-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={statistics.mode}
            />
            <input
              type="text"
              readOnly
              className="mb-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={statistics.median}
            />
            <input
              type="text"
              readOnly
              className="mb-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={statistics.standardDeviation}
            />
            <input
              type="text"
              readOnly
              className="mb-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={statistics.coefficientOfVariation}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticalMeasures;
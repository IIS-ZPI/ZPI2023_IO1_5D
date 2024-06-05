import React, { useEffect, useState } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';
import { Statistics, useStatistics } from '../contexts/StatisticsContext';
import CurrencyDropdown from './CurrencyDropdown';
import Header from './Header';
import ParameterTable from './ParameterTable';
import StartDateDropdown from './StartDateDropdown';
import TimePeriodDropdown from './TimePeriodDropdown';

const StatisticalMeasures: React.FC = () => {
  const { selectedCurrency } = useCurrency();
  const { getStatistics } = useStatistics();

  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(false);


  const getDefaultStartingDate = () => {
    const today = new Date();
    const lastMonth = new Date(today.setMonth(today.getMonth() - 1));

    const year = lastMonth.getFullYear();
    const month = String(lastMonth.getMonth() + 1).padStart(2, '0');
    const day = String(lastMonth.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const getDefaultEndDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };


  const [startingDate, setStartingDate] = useState(getDefaultStartingDate);
  const [endDate, setEndDate] = useState(getDefaultEndDate);


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

  if(startingDate == null){
    setStartingDate(getDefaultStartingDate);
  }

  return (
    <div className='size-fit'>
      <Header
        currency={selectedCurrency}
        startingDate={startingDate}
        endDate={endDate}>
      </Header> 
      <div className="flex justify-between mb-8">
        <CurrencyDropdown/>
        <div className="flex">
          <StartDateDropdown
            setStartingDate={setStartingDate}
            getDefaultStartingDate={getDefaultStartingDate}>
          </StartDateDropdown>
          <TimePeriodDropdown />
        </div>
      </div>
      <ParameterTable
        mode={statistics.mode}
        median={statistics.median}
        standardDeviation={statistics.standardDeviation}
        coefficientOfVariation={statistics.coefficientOfVariation}>
      </ParameterTable>
    </div>
  );
};

export default StatisticalMeasures;
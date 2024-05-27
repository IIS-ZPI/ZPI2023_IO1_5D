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

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const stats = await getStatistics(selectedCurrency, '2023-01-01', '2023-12-31');
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
    <div className='size-fit'>
      <Header />
      <div className="flex justify-between mb-8">
        <CurrencyDropdown/>
        <div className="flex">
          <StartDateDropdown />
          <TimePeriodDropdown />
        </div>
      </div>
      <ParameterTable
        mode={statistics.mode}
        median={statistics.median}
        standardDeviation={statistics.standardDeviation}
        coefficientOfVariation={statistics.mode}>
      </ParameterTable>
    </div>
  );
};

export default StatisticalMeasures;
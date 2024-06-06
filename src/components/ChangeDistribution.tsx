import React from 'react';
import { useCurrency } from '../contexts/CurrencyContext';

const ChangeDistribution: React.FC = () => {
  const { selectedCurrency } = useCurrency();

  return (
    <>
      <h2>Change Distribution</h2>
      <p>Selected Currency: {selectedCurrency}</p>
    </>
  );
};

export default ChangeDistribution;

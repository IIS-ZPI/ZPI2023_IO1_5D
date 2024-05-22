import React from 'react';
import { useCurrency } from '../contexts/CurrencyContext';

const SessionAnalysis: React.FC = () => {
  const { selectedCurrency } = useCurrency();
  
  return (
    <>
      <h2>Session Analysis</h2>
      <p>Selected Currency: {selectedCurrency}</p>
    </>
  );
};


export default SessionAnalysis;
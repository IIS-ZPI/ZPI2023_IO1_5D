import React from 'react';
import Page from './visual-components/page';
import { ExchangeRateProvider } from '../../contexts/ExchangeRateProvider';



const ChangeDistribution: React.FC = () => {
  return (
    <>
      <ExchangeRateProvider>
        <Page />
      </ExchangeRateProvider>
    </>
  );
};

export default ChangeDistribution;

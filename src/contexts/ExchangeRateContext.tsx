import React, { createContext, useContext, ReactNode } from 'react';
import axios from 'axios';

interface ExchangeRateContextProps {
  getExchangeRate: (currency1: string, currency2: string, startDate: string, endDate: string) => Promise<number[]>;
}

const ExchangeRateContext = createContext<ExchangeRateContextProps | undefined>(undefined);

interface ExchangeRateProviderProps {
  children: ReactNode;
}

export const ExchangeRateProvider: React.FC<ExchangeRateProviderProps> = ({ children }) => {
  const getExchangeRate = async (currency1: string, currency2: string, startDate: string, endDate: string): Promise<number[]> => {
    const baseURL = 'https://api.nbp.pl/api/exchangerates/rates/A';

    const fetchRates = async (currency: string) => {
      const response = await axios.get(`${baseURL}/${currency}/${startDate}/${endDate}/?format=json`);
      return response.data.rates.map((rate: any) => rate.mid);
    };

    if (currency1 === 'PLN') {
      const rates = await fetchRates(currency2);
      return rates.map((rate: number) => 1 / rate);
    } else if (currency2 === 'PLN') {
      return fetchRates(currency1);
    } else {
      const rates1 = await fetchRates(currency1);
      const rates2 = await fetchRates(currency2);
      return rates1.map((rate1: number, index: number) => rate1 / rates2[index]);
    }
  };

  return (
    <ExchangeRateContext.Provider value={{ getExchangeRate }}>
      {children}
    </ExchangeRateContext.Provider>
  );
};

export const useExchangeRate = (): ExchangeRateContextProps => {
  const context = useContext(ExchangeRateContext);
  if (!context) {
    throw new Error('useExchangeRate must be used within an ExchangeRateProvider');
  }
  return context;
};

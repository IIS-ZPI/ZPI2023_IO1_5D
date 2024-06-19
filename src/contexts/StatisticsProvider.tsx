import axios from 'axios';
import React, { ReactNode, createContext, useContext } from 'react';

export interface StatisticsContextProps {
  getStatistics: (currency: string, startDate: string, endDate: string) => Promise<Statistics>;
}

export interface Statistics {
  median: number;
  mode: number;
  standardDeviation: number;
  coefficientOfVariation: number;
}

export interface StatisticsProviderProps {
  children: ReactNode;
}

const StatisticsContext = createContext<StatisticsContextProps | undefined>(undefined);

export const getStatistics = async (currency: string, startDate: string, endDate: string): Promise<Statistics> => {
  const baseURL = 'https://api.nbp.pl/api/exchangerates/rates/A';
  const response = await axios.get(`${baseURL}/${currency}/${startDate}/${endDate}/?format=json`);
  const rates: number[] = response.data.rates.map((rate: { mid: number }) => rate.mid);

  rates.sort((a: number, b: number) => a - b);
  const median: number = rates.length % 2 === 0 ? (rates[rates.length / 2 - 1] + rates[rates.length / 2]) / 2 : rates[Math.floor(rates.length / 2)];

  const frequency: { [key: number]: number } = {};
  rates.forEach((rate: number) => {
    frequency[rate] = (frequency[rate] || 0) + 1;
  });
  const mode: number = parseFloat(Object.keys(frequency).reduce((a, b) => (frequency[parseFloat(a)] > frequency[parseFloat(b)] ? a : b)));

  const mean: number = rates.reduce((a: number, b: number) => a + b, 0) / rates.length;
  const standardDeviation: number = Math.sqrt(rates.reduce((sum: number, rate: number) => sum + Math.pow(rate - mean, 2), 0) / rates.length);

  const coefficientOfVariation: number = standardDeviation / mean;

  return {
    median,
    mode,
    standardDeviation,
    coefficientOfVariation,
  };
};

export const StatisticsProvider: React.FC<StatisticsProviderProps> = ({ children }) => {
  return (
    <StatisticsContext.Provider value={{ getStatistics }}>
      {children}
    </StatisticsContext.Provider>
  );
};

export const useStatistics = (): StatisticsContextProps => {
  const context = useContext(StatisticsContext);
  if (!context) {
    throw new Error('useStatistics must be used within a StatisticsProvider');
  }
  return context;
};

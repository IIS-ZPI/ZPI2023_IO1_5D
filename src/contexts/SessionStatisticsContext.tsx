import React, { createContext, useContext, ReactNode } from 'react';
import axios from 'axios';

export interface SessionStatisticsContextProps {
  getSessionStatistics: (currency: string, startDate: string, endDate: string) => Promise<SessionStatistics>;
}

export interface SessionStatistics {
  risingSessions: number;
  fallingSessions: number;
  noChangeSessions: number;
  values: number[];
}

export interface SessionStatisticsProviderProps {
  children: ReactNode;
}

const SessionStatisticsContext = createContext<SessionStatisticsContextProps | undefined>(undefined);

export const SessionStatisticsProvider: React.FC<SessionStatisticsProviderProps> = ({ children }) => {
  const getSessionStatistics = async (currency: string, startDate: string, endDate: string): Promise<SessionStatistics> => {
    const baseURL = 'https://api.nbp.pl/api/exchangerates/rates/A';
    const response = await axios.get(`${baseURL}/${currency}/${startDate}/${endDate}/?format=json`);
    const rates: number[] = response.data.rates.map((rate: { mid: number }) => rate.mid);

    let risingSessions = 0;
    let fallingSessions = 0;
    let noChangeSessions = 0;

    for (let i = 1; i < rates.length; i++) {
      if (rates[i] > rates[i - 1]) {
        risingSessions++;
      } else if (rates[i] < rates[i - 1]) {
        fallingSessions++;
      } else {
        noChangeSessions++;
      }
    }

    return {
      risingSessions,
      fallingSessions,
      noChangeSessions,
      values: rates,
    };
  };

  return (
    <SessionStatisticsContext.Provider value={{ getSessionStatistics }}>
      {children}
    </SessionStatisticsContext.Provider>
  );
};

export const useSessionStatistics = (): SessionStatisticsContextProps => {
  const context = useContext(SessionStatisticsContext);
  if (!context) {
    throw new Error('useSessionStatistics must be used within a SessionStatisticsProvider');
  }
  return context;
};

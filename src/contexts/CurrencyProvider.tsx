import axios from 'axios';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface Currency {
  code: string;
  name: string;
}

interface CurrencyContextProps {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  currencies: Currency[];
  loading: boolean;
  setLoading: (state: boolean) => void;
}

interface CurrencyProviderProps {
  children: ReactNode;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export const fetchCurrencies = async (): Promise<Currency[]> => {
  const response = await axios.get('https://api.nbp.pl/api/exchangerates/tables/A/?format=json');
  const currencyData = response.data[0].rates.map((rate: any) => ({
    code: rate.code,
    name: rate.currency
  }));
  return [{ code: 'PLN', name: 'złoty (Polska)' }, ...currencyData];
};

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCurrencies();
        setCurrencies(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching currencies:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency, currencies, loading, setLoading }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextProps => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

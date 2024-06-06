import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface Currency {
  code: string;
  name: string;
}

interface CurrencyContextProps {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  currencies: Currency[];
  loading: boolean;
}

interface CurrencyProviderProps {
  children: ReactNode;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('https://api.nbp.pl/api/exchangerates/tables/A/?format=json');
        const currencyData = response.data[0].rates.map((rate: any) => ({
          code: rate.code,
          name: rate.currency
        }));
        setCurrencies([{ code: 'PLN', name: 'Polish Zloty' }, ...currencyData]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching currencies:', error);
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency, currencies, loading }}>
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

import { expect, test, vi, beforeEach, afterEach, MockedFunction } from 'vitest';
import axios from 'axios';
import { getExchangeRate } from '../contexts/ExchangeRateProvider';

vi.mock('axios');

const mockRatesData = {
  USD: [{ mid: 3.8 }, { mid: 3.9 }, { mid: 4.0 }],
  EUR: [{ mid: 4.5 }, { mid: 4.6 }, { mid: 4.7 }],
};

beforeEach(() => {
  (axios.get as MockedFunction<typeof axios.get>).mockImplementation((url: string) => {
    if (url.includes('USD')) {
      return Promise.resolve({ data: { rates: mockRatesData.USD } });
    }
    if (url.includes('EUR')) {
      return Promise.resolve({ data: { rates: mockRatesData.EUR } });
    }
    return Promise.reject(new Error('Currency not found'));
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

test('getExchangeRate fetches and returns exchange rates when one currency is PLN', async () => {
  const result = await getExchangeRate('PLN', 'USD', '2023-01-01', '2023-01-03');
  expect(result).toEqual([1 / 3.8, 1 / 3.9, 1 / 4.0]);

  const result2 = await getExchangeRate('USD', 'PLN', '2023-01-01', '2023-01-03');
  expect(result2).toEqual([3.8, 3.9, 4.0]);
});

test('getExchangeRate fetches and returns exchange rates between two non-PLN currencies', async () => {
  const result = await getExchangeRate('USD', 'EUR', '2023-01-01', '2023-01-03');
  expect(result).toEqual([3.8 / 4.5, 3.9 / 4.6, 4.0 / 4.7]);
});

test('getExchangeRate handles API errors gracefully', async () => {
  (axios.get as MockedFunction<typeof axios.get>).mockRejectedValue(new Error('API error'));

  try {
    await getExchangeRate('USD', 'EUR', '2023-01-01', '2023-01-03');
  } catch (error: any) {
    expect(error.message).toEqual('API error');
  }
});

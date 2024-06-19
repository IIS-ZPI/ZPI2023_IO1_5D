import { expect, test, vi, beforeEach, afterEach, MockedFunction } from 'vitest';
import axios from 'axios';
import { fetchCurrencies } from '../contexts/CurrencyProvider';

vi.mock('axios');

const mockCurrencyData = [
  {
    table: 'A',
    rates: [
      { currency: 'US dollar', code: 'USD' },
      { currency: 'Euro', code: 'EUR' },
    ],
  },
];

beforeEach(() => {
  (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockCurrencyData });
});

afterEach(() => {
  vi.clearAllMocks();
});

test('fetchCurrencies fetches and returns currency data', async () => {
  const result = await fetchCurrencies();
  
  expect(result).toEqual([
    { code: 'PLN', name: 'złoty (Polska)' },
    { code: 'USD', name: 'US dollar' },
    { code: 'EUR', name: 'Euro' },
  ]);
});

test('fetchCurrencies handles API error gracefully', async () => {
  (axios.get as MockedFunction<typeof axios.get>).mockRejectedValue(new Error('API error'));

  try {
    await fetchCurrencies();
  } catch (error: any) {
    expect(error.message).toEqual('API error');
  }
});

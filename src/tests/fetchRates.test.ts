import { expect, test, vi, beforeEach, afterEach, MockedFunction } from 'vitest';
import axios from 'axios';
import { fetchRates } from '../contexts/ExchangeRateProvider';

vi.mock('axios');

const mockRatesData = {
  rates: [
    { mid: 3.8 },
    { mid: 3.9 },
    { mid: 4.0 },
  ],
};

beforeEach(() => {
  (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockRatesData });
});

afterEach(() => {
  vi.clearAllMocks();
});

test('fetchRates fetches and returns rates for given currency and date range', async () => {
  const result = await fetchRates('USD', '2023-01-01', '2023-01-03');
  
  expect(result).toEqual([3.8, 3.9, 4.0]);
});

test('fetchRates handles API errors gracefully', async () => {
  (axios.get as MockedFunction<typeof axios.get>).mockRejectedValue(new Error('API error'));

  try {
    await fetchRates('USD', '2023-01-01', '2023-01-03');
  } catch (error: any) {
    expect(error.message).toEqual('API error');
  }
});

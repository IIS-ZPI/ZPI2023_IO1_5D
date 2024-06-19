import { expect, test, vi, beforeEach, afterEach, MockedFunction } from 'vitest';
import axios from 'axios';
import { getStatistics } from '../contexts/StatisticsProvider';

vi.mock('axios');

const mockRatesData = {
  rates: [
    { mid: 3.8 },
    { mid: 4.0 },
    { mid: 3.9 },
    { mid: 4.2 },
    { mid: 4.2 },
  ],
};

beforeEach(() => {
  (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockRatesData });
});

afterEach(() => {
  vi.clearAllMocks();
});

test('getStatistics calculates correct statistics', async () => {
  const result = await getStatistics('USD', '2023-01-01', '2023-01-05');

  expect(result).toEqual({
    median: 4.0,
    mode: 4.2,
    standardDeviation: expect.any(Number),
    coefficientOfVariation: expect.any(Number),
  });

  // Additional checks for standardDeviation and coefficientOfVariation
  const mean = mockRatesData.rates.reduce((a, b) => a + b.mid, 0) / mockRatesData.rates.length;
  const standardDeviation = Math.sqrt(mockRatesData.rates.reduce((sum, rate) => sum + Math.pow(rate.mid - mean, 2), 0) / mockRatesData.rates.length);
  const coefficientOfVariation = standardDeviation / mean;

  expect(result.standardDeviation).toBeCloseTo(standardDeviation);
  expect(result.coefficientOfVariation).toBeCloseTo(coefficientOfVariation);
});

test('getStatistics handles API errors gracefully', async () => {
  (axios.get as MockedFunction<typeof axios.get>).mockRejectedValue(new Error('API error'));

  try {
    await getStatistics('USD', '2023-01-01', '2023-01-05');
  } catch (error: any) {
    expect(error.message).toEqual('API error');
  }
});

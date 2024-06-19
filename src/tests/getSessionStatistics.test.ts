import { expect, test, vi, beforeEach, afterEach, MockedFunction } from 'vitest';
import axios from 'axios';
import { getSessionStatistics } from '../contexts/SessionStatisticsProvider';

vi.mock('axios');

const mockRatesData = {
  rates: [
    { mid: 3.8 },
    { mid: 3.9 },
    { mid: 4.0 },
    { mid: 3.7 },
    { mid: 3.7 },
  ],
};

beforeEach(() => {
  (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockRatesData });
});

afterEach(() => {
  vi.clearAllMocks();
});

test('getSessionStatistics calculates correct session statistics', async () => {
  const result = await getSessionStatistics('USD', '2023-01-01', '2023-01-05');

  expect(result).toEqual({
    risingSessions: 2,
    fallingSessions: 1,
    noChangeSessions: 1,
    values: [3.8, 3.9, 4.0, 3.7, 3.7],
  });
});

test('getSessionStatistics handles API errors gracefully', async () => {
  (axios.get as MockedFunction<typeof axios.get>).mockRejectedValue(new Error('API error'));

  try {
    await getSessionStatistics('USD', '2023-01-01', '2023-01-05');
  } catch (error: any) {
    expect(error.message).toEqual('API error');
  }
});

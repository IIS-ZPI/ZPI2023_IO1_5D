import { expect, test } from 'vitest';
import { getDefaultStartingDate, calculateEndDate, daysDifference, getMaxDate } from '../utils/dateUtils';

test('getDefaultStartingDate returns a date string of the first day of the previous month', () => {
  const today = new Date();
  const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const firstDayOfPreviousMonth = new Date(firstDayOfCurrentMonth.setMonth(firstDayOfCurrentMonth.getMonth() - 1));
  const expectedDate = `${firstDayOfPreviousMonth.getFullYear()}-${String(firstDayOfPreviousMonth.getMonth() + 1).padStart(2, '0')}-${String(firstDayOfPreviousMonth.getDate()).padStart(2, '0')}`;
  
  expect(getDefaultStartingDate()).toBe(expectedDate);
});

test('calculateEndDate calculates the correct end date based on the time period', () => {
  const startDate = '2023-01-01';

  expect(calculateEndDate(startDate, '7 days')).toBe('2023-01-08');
  expect(calculateEndDate(startDate, '14 days')).toBe('2023-01-15');
  expect(calculateEndDate(startDate, '30 days')).toBe('2023-02-01');
  expect(calculateEndDate(startDate, '90 days')).toBe('2023-04-01');
  expect(calculateEndDate(startDate, '180 days')).toBe('2023-07-01');
  expect(calculateEndDate(startDate, '365 days')).toBe('2024-01-01');
  expect(calculateEndDate(startDate, 'Switch period')).toBe('2023-02-01');
});

test('daysDifference returns true if the difference between today and the starting date is greater than or equal to the specified days', () => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 10);
  const startDateString = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
  
  expect(daysDifference(startDateString, 7)).toBe(true);
  expect(daysDifference(startDateString, 14)).toBe(false);
});

test('getMaxDate returns the correct max date, which is 7 days before today', () => {
  const today = new Date();
  const maxDate = new Date(today.setDate(today.getDate() - 7));
  const expectedDate = `${maxDate.getFullYear()}-${String(maxDate.getMonth() + 1).padStart(2, '0')}-${String(maxDate.getDate()).padStart(2, '0')}`;
  
  expect(getMaxDate()).toBe(expectedDate);
});

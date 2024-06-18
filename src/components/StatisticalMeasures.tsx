import React, { useEffect, useState } from "react";
import { useCurrency } from "../contexts/CurrencyContext";
import { Statistics, useStatistics } from "../contexts/StatisticsContext";

const StatisticalMeasures: React.FC = () => {
  const {
    selectedCurrency,
    setSelectedCurrency,
    currencies,
    loading,
    setLoading,
  } = useCurrency();
  const { getStatistics } = useStatistics();

  const getDefaultStartingDate = () => {
    const today = new Date();
    const lastMonth = new Date(today.setMonth(today.getMonth() - 1));

    const year = lastMonth.getFullYear();
    const month = String(lastMonth.getMonth() + 1).padStart(2, "0");
    const day = String(lastMonth.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [startingDate, setStartingDate] = useState(() =>
    getDefaultStartingDate()
  );
  const [isStartingDateSelected, setIsStartingDateSelected] = useState(false);
  const [statistics, setStatistics] = useState<Statistics | null>(null);

  const calculateEndDate = (startingDate: string, timePeriod: string) => {
    const startDate = new Date(startingDate);
    let result: Date;

    switch (timePeriod) {
      case "7 days":
        result = new Date(startDate.setDate(startDate.getDate() + 7));
        break;
      case "14 days":
        result = new Date(startDate.setDate(startDate.getDate() + 14));
        break;
      case "30 days":
      case "Switch period":
        result = new Date(startDate.setMonth(startDate.getMonth() + 1));
        break;
      case "90 days":
        result = new Date(startDate.setMonth(startDate.getMonth() + 3));
        break;
      case "180 days":
        result = new Date(startDate.setMonth(startDate.getMonth() + 6));
        break;
      case "365 days":
        result = new Date(startDate.setFullYear(startDate.getFullYear() + 1));
        break;
      default:
        console.error("Error with timePeriod");
        return "";
    }

    const year = result.getFullYear();
    const month = String(result.getMonth() + 1).padStart(2, "0");
    const day = String(result.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [timePeriod, setTimePeriod] = useState("Switch period");
  const [isTimePeriodSelected, setIsTimePeriodSelected] = useState(false);
  const [endDate, setEndDate] = useState(() =>
    calculateEndDate(startingDate, timePeriod)
  );

  useEffect(() => {
    if (isStartingDateSelected != isTimePeriodSelected) return;
    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const stats = await getStatistics(
          selectedCurrency,
          startingDate,
          endDate
        );
        setStatistics(stats);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [selectedCurrency, startingDate, timePeriod]);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()

    setSelectedCurrency(e.target.value);
  };

  const handleStartingDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const newStartingDate = e.target.value;
    if (newStartingDate === "") {
      setStartingDate(getDefaultStartingDate());
      setIsStartingDateSelected(false);

      setTimePeriod("Switch period");
      setIsTimePeriodSelected(false);
      setEndDate(calculateEndDate(getDefaultStartingDate(), "Switch period"));
      return;
    }

    setStartingDate(newStartingDate);
    setIsStartingDateSelected(true);

    setTimePeriod("Switch period");
    setIsTimePeriodSelected(false);
    setStatistics(null);
    setEndDate("");
  };

  const handleTimePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()

    const newTimePeriod = e.target.value;
    setTimePeriod(newTimePeriod);
    setIsTimePeriodSelected(true);
    setEndDate(calculateEndDate(startingDate, newTimePeriod));
  };

  const daysDifference = (days: number) => {
    if (!isStartingDateSelected) return false;
    const today = new Date();
    const startDate = new Date(startingDate);
    const differenceInTime = today.getTime() - startDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays >= days;
  };

  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today.setDate(today.getDate() - 7));
    const year = maxDate.getFullYear();
    const month = String(maxDate.getMonth() + 1).padStart(2, "0");
    const day = String(maxDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="w-fill m-16">
      <div className="flex justify-between items-center mb-4 border-b-2 border-gray_for_text px-4">
        <h1 className="text-3xl font-bold">{selectedCurrency}</h1>
        <div className="text-xl font-bold">
          {startingDate} - {endDate}
        </div>
      </div>
      <div className="flex mb-16 justify-between">
        <div className="relative w-64">
          <label
            htmlFor="currency"
            className="block text-black text-xs font-bold mb-2"
          >
            Currency
          </label>
          <div className="relative">
            {loading ? (
              <p>Loading currencies...</p>
            ) : (
              <>
                <select
                  id="currency"
                  className="h-10 block appearance-none w-full bg-white border border-gray_for_text px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                  value={selectedCurrency}
                  onChange={handleCurrencyChange}
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </>
            )}
          </div>
        </div>

        <div>
          <div className="flex">
            <div className="relative w-40">
              <label
                htmlFor="start-date"
                className="block text-gray-700 text-xs font-bold mb-2"
              >
                Starting date
              </label>
              <input
                type="date"
                className="block appearance-none w-full bg-white border border-gray_for_text px-4 py-2 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleStartingDateChange}
                placeholder="Select a date"
                value={isStartingDateSelected ? startingDate : ""}
                max={getMaxDate()}
              />
            </div>
            <div className="relative w-40 pl-3">
              <label
                htmlFor="time-period"
                className="block text-gray-700 text-xs font-bold mb-2"
              >
                Time period
              </label>
              <div className="relative">
                <select
                  className="h-10 block appearance-none w-full bg-white border border-gray_for_text px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleTimePeriodChange}
                  value={isTimePeriodSelected ? timePeriod : "Switch period"}
                >
                  <option disabled selected hidden>
                    Switch period
                  </option>
                  <option value="7 days" disabled={!daysDifference(7)}>
                    1 week
                  </option>
                  <option value="14 days" disabled={!daysDifference(14)}>
                    2 weeks
                  </option>
                  <option value="30 days" disabled={!daysDifference(30)}>
                    1 month
                  </option>
                  <option value="90 days" disabled={!daysDifference(90)}>
                    1 quarter
                  </option>
                  <option value="180 days" disabled={!daysDifference(180)}>
                    6 months
                  </option>
                  <option value="365 days" disabled={!daysDifference(365)}>
                    1 year
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 w-fit">
        <div>
          <h2 className="text-2xl font-bold">Parameters</h2>
          <div className="ps-1 mt-4 font-medium text-md">
            <p className="mb-2 ps-2 py-1 border border-transparent bg-light_gray rounded-lg">
              Mode:
            </p>
            <p className="mb-2 ps-2 py-1 border border-transparent bg-light_gray rounded-lg">
              Median:
            </p>
            <p className="mb-2 ps-2 py-1 border border-transparent bg-light_gray rounded-lg">
              Standard deviation:
            </p>
            <p className="mb-2 ps-2 py-1 border border-transparent bg-light_gray rounded-lg">
              Coefficient of variation:
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Values</h2>
          <div className="mt-4 font-medium text-md">
            <input
              type="text"
              readOnly
              className="mb-2 py-1 px-2 block rounded-lg border border-gray_for_text w-1/2"
              value={statistics ? statistics.mode : 0}
            />
            <input
              type="text"
              readOnly
              className="mb-2 py-1 px-2 block rounded-lg border border-gray_for_text w-1/2"
              value={statistics ? statistics.median : 0}
            />
            <input
              type="text"
              readOnly
              className="mb-2 py-1 px-2 block rounded-lg border border-gray_for_text w-1/2"
              value={statistics ? statistics.standardDeviation.toFixed(8) : 0}
            />
            <input
              type="text"
              readOnly
              className="mb-2 py-1 px-2 block rounded-lg border border-gray_for_text w-1/2"
              value={
                statistics ? statistics.coefficientOfVariation.toFixed(8) : 0
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticalMeasures;

import React, { useEffect, useState } from "react";
import { useCurrency } from "../../../contexts/CurrencyContext";
import { useExchangeRate } from "../../../contexts/ExchangeRateContext";
import "./page.css";
import ChartComponent from './chart';
import img from '../../../assets/c-right.svg'

export default function Page() {
    const { selectedCurrency, setSelectedCurrency, currencies, loading } = useCurrency();
    const { getExchangeRate } = useExchangeRate();
    const [currency2, setCurrency2] = useState("EUR");
    
    const [exchangeRates, setExchangeRates] = useState<number[]>([]);
    const [isStartingDateSelected, setIsStartingDateSelected] = useState(false);
    const [currentDate] = useState(new Date());
    const [timePeriod, setTimePeriod] = useState("Switch period");
    const [isTimePeriodSelected, setIsTimePeriodSelected] = useState(false);

    const getDefaultStartingDate = () => {
        const today = new Date();
        const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
    
        const year = lastMonth.getFullYear();
        const month = String(lastMonth.getMonth() + 1).padStart(2, "0");
        const day = String(lastMonth.getDate()).padStart(2, "0");
    
        return `${year}-${month}-${day}`;
      };
    const [startDate, setStartDate] = useState(() =>
        getDefaultStartingDate()
    );

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(e.target.value);
    };

    const handleCurrency2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency2(e.target.value);
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStartDate = new Date(e.target.value);
        const minDate = new Date("2002-01-02");

        if (newStartDate > minDate && newStartDate < currentDate) {
            setStartDate(e.target.value);
            setIsStartingDateSelected(true);
            setTimePeriod("Switch period");
            setIsTimePeriodSelected(false);   
            setEndDate("");
        } else {
            console.log("Start date must be after January 2, 2002. Start date have to be less then EndDate. Start date have to be in range 365 of end date");
        }
    };

    const getMaxDate = () => {
        const today = new Date();
        const maxDate = new Date(today.setDate(today.getDate() - 7));
        const year = maxDate.getFullYear();
        const month = String(maxDate.getMonth() + 1).padStart(2, "0");
        const day = String(maxDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

    const handleTimePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTimePeriod = e.target.value;
        setTimePeriod(newTimePeriod);
        setIsTimePeriodSelected(true);
        setEndDate(calculateEndDate(startDate, newTimePeriod));
      };

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

    const [endDate, setEndDate] = useState(() =>
        calculateEndDate(startDate, timePeriod)
    );

    const daysDifference = (days: number) => {
        if (!isStartingDateSelected) return false;
        const today = new Date();
        const startingDate = new Date(startDate);
        const differenceInTime = today.getTime() - startingDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        return differenceInDays >= days;
    };

    useEffect(() => {
        const updateExchangeRate = async () => {
            try {
                if(isStartingDateSelected && isTimePeriodSelected) {
                    calculateEndDate(startDate, timePeriod);
                    console.log("Fetching exchange rates with params:", {
                        selectedCurrency,
                        currency2,
                        startDate,
                        endDate, 
                    });
                    const rates = await getExchangeRate(selectedCurrency, currency2, startDate, endDate); {/* Tutaj zmienic */}
                    setExchangeRates(rates);
                }
                else {
                    throw String(isStartingDateSelected + " " + isTimePeriodSelected);
                }
            } catch (error) {
                console.error("Error fetching exchange rates:", error);
            }
        };

        updateExchangeRate();
    }, [selectedCurrency, currency2, startDate, endDate])

    return (
        <div className="w-fill m-16">
            {/* Text shown for user information */}
            <div className="flex justify-between items-center mb-4 font-bold text-3xl border-b-2 border-gray_for_text">
                <div className="flex">
                    {selectedCurrency} <img src={img} alt="->" /> {currency2}
                </div>
                <div className="text-xl text-end">
                    {startDate} - {endDate}
                </div>
            </div>

            {/* Contener for data changes */}
            <div className="contener justify-between mb-10 gap-4">
                {/* Currencies changes */}
                <div className="flex gap-4">
                    <div className="w-64">
                        <label className="text-xs font-bold">From</label>
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
                    <div className="w-64">
                        <label className="text-xs font-bold">To</label>
                        <div className="relative">
                        {loading ? (
                            <p>Loading currencies...</p>
                            ) : (
                            <>
                                <select
                                id="currency"
                                className="h-10 block appearance-none w-full bg-white border border-gray_for_text px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                                value={currency2}
                                onChange={handleCurrency2Change}
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
                </div>
                {/* Date changes */}
                <div className="mb-4 w-1/2 flex justify-end">
                    <div className="flex gap-4 w-full justify-end">
                        <div className="">
                            <label htmlFor="startDate" className="block text-gray-700 text-xs font-bold mb-2">Starting date</label>
                            <input
                                type="date"
                                id="startDate"
                                value={isStartingDateSelected ? startDate : ""}
                                onChange={handleStartDateChange}
                                className="h-10 block appearance-none w-full bg-white border border-gray_for_text px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Start Date"
                                max ={getMaxDate()}
                            />
                        </div>
                        <div className="relative w-40">
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

            {exchangeRates.length !== 0 && 
            <>
                {/* Chart description */}
                <div className="mb-12">
                    <h1 className="text-2xl font-bold mb-2">Distribution of monthly changes</h1>
                    <p className="text-sm">
                        Frequency histogram of changes occurring in a given interval
                    </p>
                </div>
                {/* Chart */}
                <div>
                    <ChartComponent
                        selectedCurrency={selectedCurrency}
                        currency2={currency2}
                        exchangeRates={exchangeRates}
                    />
                </div>
            </>
            }
        </div>
    );
}

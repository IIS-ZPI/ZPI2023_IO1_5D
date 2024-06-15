import React, { useState } from "react";
import { useCurrency } from "../../../contexts/CurrencyContext";
import { useExchangeRate } from "../../../contexts/ExchangeRateContext";
import "./page.css";
import ChartComponent from './chart';
import img from '../../../assets/c-right.svg'

export default function Page() {
    const { selectedCurrency, setSelectedCurrency, currencies, loading } = useCurrency();
    const { getExchangeRate } = useExchangeRate();
    const [currency2, setCurrency2] = useState("USD");
    const [startDate, setStartDate] = useState("2023-10-01");
    const [endDate, setEndDate] = useState("2023-12-10");
    const [exchangeRates, setExchangeRates] = useState<number[]>([]);

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(e.target.value);
        updateExchangeRate();
    };

    const handleCurrency2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency2(e.target.value);
        updateExchangeRate();
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStartDate = new Date(e.target.value);
        const minDate = new Date("2002-01-02");
        const oldEndDate = new Date(endDate); 
        const diffInDays = (oldEndDate.getTime() - newStartDate.getTime()) / (1000 * 3600 * 24);
        if (newStartDate > minDate && diffInDays <= 365 && oldEndDate > newStartDate) {
            setStartDate(e.target.value);
            updateExchangeRate();
        } else {
            console.log("Start date must be after January 2, 2002. Start date have to be less then EndDate. Start date have to be in range 365 of end date");
        }
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEndDate = new Date(e.target.value);
        const start = new Date(startDate);
        const minDate = new Date("2002-01-03");
        const diffInDays = (newEndDate.getTime() - start.getTime()) / (1000 * 3600 * 24);
        console.log(newEndDate, start, minDate, diffInDays);
        if (diffInDays <= 365 && minDate < newEndDate && newEndDate > start) {
            setEndDate(e.target.value);
            updateExchangeRate();
        } else {
            console.log("The date range must be no more than 365 days. Can't be less 2002-01-03. End date can't be less then start date.");
        }
        
    };

    const updateExchangeRate = async () => {
        try {
            console.log("Fetching exchange rates with params:", {
                selectedCurrency,
                currency2,
                startDate,
                endDate,
            });
            const rates = await getExchangeRate(selectedCurrency, currency2, startDate, endDate);
            setExchangeRates(rates);
        } catch (error) {
            console.error("Error fetching exchange rates:", error);
        }
    };

    return (
        <div>
            {/* Text shown for user information */}
            <div className="flex mb-1 font-bold text-2xl">
                <div className="w-1/5 flex">
                    {selectedCurrency} <img src={img} alt="->" /> {currency2}
                </div>
                <div className="w-4/5 text-end">
                    {startDate} - {endDate}
                </div>
            </div>

            <hr className="hr-color mb-3"/>
            {/* Contener for data changes */}
            <div className="contener">
                {/* Currencies changes */}
                <div className="flex w-1/2">
                    <div className="w-48">
                    {loading ? (
                        <p>Loading currencies...</p>
                    ) : (
                        <select className="h-10 block appearance-none w-full bg-white border border-gray_for_text px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                        value={selectedCurrency} aria-placeholder="Change currency" onChange={handleCurrencyChange}>
                        {currencies.map((currency) => (
                            <option className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"  key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                            </option>
                        ))}
                        </select>
                    )}
                    </div>
                    <div className="secondCurrency w-48">
                        {loading ? (
                            <p>Loading currencies...</p>
                        ) : (
                            <select className="h-10 block appearance-none w-full bg-white border border-gray_for_text px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline "
                            value={currency2} onChange={handleCurrency2Change}>
                                {currencies.map((currency) => (
                                    <option className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700" key={currency.code} value={currency.code}>
                                        {currency.code} - {currency.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>
                {/* Date changes */}
                <div className="mb-4 w-1/2 content-end">
                    <div className="flex content-end w-full bg-green">
                        <div>
                            <label htmlFor="startDate" className="">Starting date</label>
                            <input
                                type="date"
                                id="startDate"
                                value={startDate}
                                onChange={handleStartDateChange}
                                className=""
                                placeholder="Start Date"
                            />
                        </div>
                        <div>
                            <label htmlFor="endDate" className="">Time period</label>
                            <input
                                type="date"
                                id="endDate"
                                value={endDate}
                                onChange={handleEndDateChange}
                                className=""
                            />
                        </div>
                    </div>
                </div>
            </div>
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
        </div>
    );
}

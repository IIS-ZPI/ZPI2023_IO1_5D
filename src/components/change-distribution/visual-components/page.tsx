import React, { useState } from "react";
import { useCurrency } from "../../../contexts/CurrencyContext";
import { useExchangeRate } from "../../../contexts/ExchangeRateContext";
import "./page.css";
import ChartComponent from './chart';
import img from '../../../assets/c-right.svg'

export default function Page() {
    const { selectedCurrency, currencies, loading } = useCurrency();
    const { getExchangeRate } = useExchangeRate();
    const [currency2, setCurrency2] = useState("USD");
    const [startDate, setStartDate] = useState("2023-10-01");
    const [endDate, setEndDate] = useState("2023-12-10");
    const [exchangeRates, setExchangeRates] = useState<number[]>([]);

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
                <div className="">
                {loading ? (
                    <p>Loading currencies...</p>
                ) : (
                    <select value={selectedCurrency} onChange={handleCurrencyChange}>
                    {currencies.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                        </option>
                    ))}
                    </select>
                )}
                </div>
                <div className="secondCurrency">
                    {loading ? (
                        <p>Loading currencies...</p>
                    ) : (
                        <select value={currency2} onChange={handleCurrencyChange}>
                            {currencies.map((currency) => (
                                <option key={currency.code} value={currency.code}>
                                    {currency.code} - {currency.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                {/* Date changes */}
                <div className="mb-4">
                    <div className="flex">
                        <div>
                            <label htmlFor="startDate" className="">Start Date</label>
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
                            <label htmlFor="endDate" className="">End Date</label>
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

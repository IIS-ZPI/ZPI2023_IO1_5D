import React, { useState } from "react";
import { useCurrency } from "../../../contexts/CurrencyContext";
import { useExchangeRate } from "../../../contexts/ExchangeRateContext";
import "./page.css";
import ChartComponent from './chart';

export default function Page() {
    const { selectedCurrency, currencies, loading } = useCurrency();
    const { getExchangeRate } = useExchangeRate();
    const [currency2, setCurrency2] = useState("USD");
    const [startDate, setStartDate] = useState("2000-10-01");
    const [endDate, setEndDate] = useState("2000-12-10");
    const [exchangeRates, setExchangeRates] = useState<number[]>([]);

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency2(e.target.value);
        updateExchangeRate();
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
        updateExchangeRate();
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
        updateExchangeRate();
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
            <h2>Change Distribution {selectedCurrency} To {currency2}</h2>
            <div className="contener">
                <div className="secondCurrency">
                    <p>Select second currency, now is: {currency2}</p>
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
                <div className="mb-4">
                    <p className="mb-2">Select date range</p>
                    <div className="flex">
                        <div>
                            <label htmlFor="startDate" className="">Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                value={startDate}
                                onChange={handleStartDateChange}
                                className=""
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

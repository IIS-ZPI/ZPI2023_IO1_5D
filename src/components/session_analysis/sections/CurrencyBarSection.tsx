import React from "react";
import { toast } from 'react-hot-toast'
import { isAfter } from 'date-fns';
import { useCurrency } from '../../../contexts/CurrencyProvider';
import { Calendar, CalendarChangeValues } from '../components/Calendar/Calendar';
import { formatDate } from '../hooks/useFetchCurrency.utils';
import { calculateEndPeriod, calculateMaxAllowedDate } from '../SessionAnalysis.utils';

type CurrencyBarSectionProps = {
    startTime: Date;
    timePeriod: string;
    setTimePeriod: (timePeriod: string) => void;
    setStartTime: (timePeriod: Date) => void;
};

const PERIODS_OPTIONS = [
    { value: '365', label: '1 year' },
    { value: '182', label: '6 months' },
    { value: '90', label: '1 quarter' },
    { value: '30', label: '1 month' },
    { value: '14', label: '2 weeks' },
    { value: '7', label: '1 week' },
];

const CurrencyBarSection: React.FC<CurrencyBarSectionProps> = ({
    startTime,
    timePeriod,
    setTimePeriod,
    setStartTime,
}) => {
    const { selectedCurrency, currencies, setSelectedCurrency, loading } = useCurrency();

    const endDate = calculateEndPeriod(startTime, timePeriod);
    const maximumDate = calculateMaxAllowedDate(new Date(), timePeriod);

    const handlePeriodChange = (timePeriod: string | undefined) => {
        if (timePeriod) {
            setTimePeriod(timePeriod);

            const recalculatedMaxDate = calculateMaxAllowedDate(
                new Date(),
                timePeriod
            );
            const recalculatedEndDate = calculateEndPeriod(
                startTime,
                timePeriod
            );

            if (isAfter(recalculatedEndDate, recalculatedMaxDate)) {
                setStartTime(recalculatedMaxDate);
            }

            setTimePeriod(timePeriod);
        }
    };

    const handleDateChange = ({ valueAsDate }: CalendarChangeValues) => {
        if (valueAsDate) {
            setStartTime(valueAsDate);
        }
    };

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        const newCurrency = e.target.value;

        if (newCurrency === "PLN")
            toast.error("You are not able to choose PLN as currency!");
        else
            setSelectedCurrency(newCurrency);
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4 border-b-2 border-gray_for_text">
                <h1 className="text-3xl font-bold">{selectedCurrency}</h1>
                <div className="text-xl font-bold">
                    {formatDate(startTime)} - {formatDate(endDate)}
                </div>
            </div>
            <div className="flex mb-16 justify-between">
                <div className="relative w-64">
                    <label htmlFor="currency" className="block text-black text-xs font-bold mb-2">
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
                            <label htmlFor="start-date" className="block text-gray-700 text-xs font-bold mb-2">
                                Starting date
                            </label>
                            <Calendar
                                value={startTime}
                                label=""
                                placeholder="Pick date"
                                onChange={handleDateChange}
                                max={maximumDate}
                            />
                        </div>
                        <div className="relative w-40 pl-3">
                            <label htmlFor="time-period" className="block text-gray-700 text-xs font-bold mb-2">
                                Time period
                            </label>
                            <div className="relative">
                                <select
                                    id="time-period"
                                    className="h-10 block appearance-none w-full bg-white border border-gray_for_text px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={(e) => handlePeriodChange(e.target.value)}
                                    value={timePeriod}
                                >
                                    {PERIODS_OPTIONS.map(({ label, value }, index) => (
                                        <option key={index} value={value}>
                                            {label}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrencyBarSection;

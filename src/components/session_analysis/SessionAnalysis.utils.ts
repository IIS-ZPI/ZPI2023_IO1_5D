import { addDays } from 'date-fns';

export const calculateEndPeriod = (startTime: Date, timePeriod: string): Date => {
    const parsedTimePeriod = Number(timePeriod);
    if (isNaN(parsedTimePeriod)) {
        return addDays(startTime, 1);
    }

    let endDate: Date;

    switch (timePeriod) {
        case '7 days':
            endDate = addDays(startTime, 7);
            break;
        case '14 days':
            endDate = addDays(startTime, 14);
            break;
        case '30 days':
        case 'Switch period':
            endDate = new Date(startTime);
            endDate.setMonth(endDate.getMonth() + 1);
            break;
        case '90 days':
            endDate = new Date(startTime);
            endDate.setMonth(endDate.getMonth() + 3);
            break;
        case '180 days':
            endDate = new Date(startTime);
            endDate.setMonth(endDate.getMonth() + 6);
            break;
        case '365 days':
            endDate = new Date(startTime);
            endDate.setFullYear(endDate.getFullYear() + 1);
            break;
        default:
            endDate = addDays(startTime, parsedTimePeriod);
            break;
    }

    return endDate;
};

export const calculateMaxAllowedDate = (selectedDate: Date, timePeriod: string): Date => {
    const parsedTimePeriod = Number(timePeriod);

    if (isNaN(parsedTimePeriod)) {
        return addDays(selectedDate, 1);
    }

    return addDays(selectedDate, -parsedTimePeriod);
};

export const getDefaultStartingDate = (): Date => {
    const today = new Date();
    const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstDayOfPreviousMonth = new Date(firstDayOfCurrentMonth.setMonth(firstDayOfCurrentMonth.getMonth() - 1));

    return firstDayOfPreviousMonth;
};

export const getDefaultEndDate = (): Date => {
    const today = new Date();
    const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    return firstDayOfCurrentMonth;
};

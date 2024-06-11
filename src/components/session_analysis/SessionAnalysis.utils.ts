import { addDays } from 'date-fns'

export const calculateEndPeriod = (startTime: Date, timePeriod: string) => {
    const parsedTimePeriod = Number(timePeriod)
    if (isNaN(parsedTimePeriod)) {
        return addDays(startTime, 1)
    }

    return addDays(startTime, parsedTimePeriod)
}

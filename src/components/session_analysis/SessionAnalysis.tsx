import { Alert, Card } from '@material-tailwind/react'
import { useState } from 'react'
import { useCurrency } from '../../contexts/CurrencyContext.tsx'
import { calculateEndPeriod } from './SessionAnalysis.utils.ts'
import { PeriodsSection } from './sections/PeriodsSection.tsx'
import { Chart } from './components/Chart/Chart.tsx'
import { State } from './hooks/useFetchCurrency.types.ts'
import { CurrencyBarSection } from './sections/CurrentcyBarSection.tsx'
import { useFetchCurrency } from './hooks/useFetchCurrency.ts'
import { formatDate } from './hooks/useFetchCurrency.utils.ts'

type SharedData = {
    startTime: Date
    timePeriod: string
}

const SessionAnalysis = () => {
    const [{ startTime, timePeriod }, setSharedDate] = useState<SharedData>({
        startTime: new Date(),
        timePeriod: '365',
    })

    const { selectedCurrency } = useCurrency()
    const { state, value, error } = useFetchCurrency({
        currency: selectedCurrency,
        startDate: formatDate(startTime),
        endDate: formatDate(calculateEndPeriod(startTime, timePeriod)),
    })

    const setStartTime = (value: Date) =>
        setSharedDate({
            timePeriod,
            startTime: value,
        })

    const setTimePeriod = (value: string) =>
        setSharedDate({
            timePeriod: value,
            startTime,
        })

    return (
        <div className="container mx-auto p-4">
            <CurrencyBarSection
                startTime={startTime}
                timePeriod={timePeriod}
                setStartTime={setStartTime}
                setTimePeriod={setTimePeriod}
            />

            {state === State.Error && (
                <Alert
                    color="red"
                    className="mt-4 mb-6 transition-all duration-500"
                    // eslint-disable-next-line react/no-children-prop
                    children={error?.message}
                />
            )}

            <Card
                className="p-4 mb-6"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            >
                <Chart data={value} />
            </Card>

            <PeriodsSection state={state} value={value} />
        </div>
    )
}

export default SessionAnalysis

import { Card } from '@material-tailwind/react';
import { useState } from 'react';
import { useCurrency } from '../../contexts/CurrencyProvider';
import {
    calculateEndPeriod,
    getDefaultStartingDate,
} from './SessionAnalysis.utils';
import { PeriodsSection } from './sections/PeriodsSection';
import { Chart } from './components/Chart/Chart';
import CurrencyBarSection from './sections/CurrencyBarSection';
import { useFetchCurrency } from './hooks/useFetchCurrency';
import { formatDate } from './hooks/useFetchCurrency.utils';

const DEFAULT_TIME_PERIOD = '30';

const SessionAnalysis = () => {
    const [startTime, setStartTime] = useState(getDefaultStartingDate());
    const [timePeriod, setTimePeriod] = useState(DEFAULT_TIME_PERIOD);

    const { selectedCurrency } = useCurrency();
    const { state, value } = useFetchCurrency({
        currency: selectedCurrency,
        startDate: formatDate(startTime),
        endDate: formatDate(calculateEndPeriod(startTime, timePeriod)),
    });

    return (
        <div className="w-fill m-16">
            <CurrencyBarSection
                startTime={startTime}
                timePeriod={timePeriod}
                setStartTime={setStartTime}
                setTimePeriod={setTimePeriod}
            />

            <Card
                className="p-4 mb-6 relative w-full"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            >
                <Chart data={value} />
            </Card>

            <PeriodsSection state={state} value={value} />
        </div>
    );
};

export default SessionAnalysis;

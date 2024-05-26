import { useCurrency } from '../../contexts/CurrencyContext.tsx'
import {
    StatisticBatch,
    StatisticBatchProps,
} from './components/StatisticBatch.tsx'

const TMP_VALUES: StatisticBatchProps[] = [
    {
        icon: 'minus',
        text: 'Unchanged periods',
        value: 5,
    },
    {
        icon: 'arrowUp',
        text: 'Growth periods',
        value: 10,
    },
    {
        icon: 'arrowDown',
        text: 'Slack periods',
        value: 3,
    },
]

const SessionAnalysis = () => {
    const { selectedCurrency } = useCurrency()

    return (
        <>
            <h2>Session Analysis</h2>
            <p>Selected Currency: {selectedCurrency}</p>
            <br />

            <div className="flex">
                {TMP_VALUES.map((values, index) => (
                    <StatisticBatch
                        className="w-52"
                        key={index}
                        icon={values.icon}
                        text={values.text}
                        value={values.value}
                    />
                ))}
            </div>
        </>
    )
}

export default SessionAnalysis

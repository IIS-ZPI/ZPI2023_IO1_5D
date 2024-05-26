import { useCurrency } from '../../contexts/CurrencyContext.tsx'
import { StatisticBatch } from './components/StatisticBatch.tsx'

const SessionAnalysis = () => {
    const { selectedCurrency } = useCurrency()

    return (
        <>
            <h2>Session Analysis</h2>
            <p>Selected Currency: {selectedCurrency}</p>
            <StatisticBatch icon="minus" text="Unchanged periods" value={5} />
            <StatisticBatch icon="arrowUp" text="Growth periods" value={10} />
            <StatisticBatch icon="arrowDown" text="Slack periods" value={3} />
        </>
    )
}

export default SessionAnalysis

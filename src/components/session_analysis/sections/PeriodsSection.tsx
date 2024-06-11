import {
    StatisticBatch,
    StatisticBatchProps,
} from '../components/StatisticBatch.tsx'
import { CurrencyResponse, State } from '../hooks/useFetchCurrency.types.ts'

const sortPeriods = (currencyResponse?: CurrencyResponse) => {
    const periods: Record<
        string,
        Pick<StatisticBatchProps, 'text' | 'icon' | 'value'>
    > = {
        unchanged: {
            text: 'Unchanged periods',
            icon: 'minus',
            value: 0,
        },
        growth: {
            text: 'Growth periods',
            icon: 'arrowUp',
            value: 0,
        },
        slack: {
            text: 'Slack periods',
            icon: 'arrowDown',
            value: 0,
        },
    }

    if (!currencyResponse?.rates) {
        return periods
    }

    for (let i = 1; i < currencyResponse.rates.length - 1; i++) {
        const previous = currencyResponse.rates[i - 1]
        const current = currencyResponse.rates[i]

        if (previous.mid === current.mid) {
            periods.unchanged.value++
        } else if (previous.mid > current.mid) {
            periods.growth.value++
        } else {
            periods.slack.value++
        }
    }

    return periods
}

export type PeriodsSectionProps = {
    state: State
    value?: CurrencyResponse
}

export const PeriodsSection = ({ state, value }: PeriodsSectionProps) => {
    const periods = sortPeriods(value)

    return (
        <section className="flex">
            {Object.values(periods).map((values, index) => (
                <StatisticBatch
                    className="w-52"
                    key={index}
                    icon={values.icon}
                    text={values.text}
                    value={values.value}
                    loading={state === State.Loading}
                />
            ))}
        </section>
    )
}

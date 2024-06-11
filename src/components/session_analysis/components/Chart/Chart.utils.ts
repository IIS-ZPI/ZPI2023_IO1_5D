import { CurrencyResponse } from '../../hooks/useFetchCurrency.types.ts'
import { ChartJsProps } from './Chart.types.ts'

export const createData = (
    value: CurrencyResponse | undefined,
    selectedCurrency: string
): ChartJsProps['data'] => {
    const label = `PLN to ${selectedCurrency.toUpperCase()}`

    if (!value) {
        return {
            labels: [],
            datasets: [{ label, data: [] }],
        }
    }

    return {
        labels: value.rates.map((value) => value.effectiveDate) ?? [],
        datasets: [
            {
                label: `PLN to ${selectedCurrency.toUpperCase()}`,
                data: value.rates.map((value) => value.mid) ?? [],
                tension: 0.75, // This value controls the smoothness of the line
                borderColor: '#80b6f4',
                pointBorderColor: '#80b6f4',
                pointBackgroundColor: '#80b6f4',
                pointHoverBackgroundColor: 'rgb(62, 100, 150)',
                pointHoverBorderColor: 'rgb(62, 100, 150)',
                pointBorderWidth: 3,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                fill: false,
                borderWidth: 4,
                normalized: true,
                showLine: true,
            },
        ],
    }
}

export const createOptions = (currency: string): ChartJsProps['options'] => ({
    responsive: true,
    scales: {
        x: {
            title: {
                display: true,
                text: 'Date',
            },
        },
        y: {
            title: {
                display: true,
                text: currency,
            },
            ticks: {
                format: {
                    maximumFractionDigits: 4,
                    minimumFractionDigits: 4,
                },
            },
        },
    },
})

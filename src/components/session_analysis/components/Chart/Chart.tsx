import { Chart as ChartJS, registerables } from 'chart.js'
import { Line } from 'react-chartjs-2'

import { useCurrency } from '../../../../contexts/CurrencyContext.tsx'
import { createData, createOptions } from './Chart.utils.ts'
import { CurrencyResponse } from '../../hooks/useFetchCurrency.types.ts'

export type ChartProps = {
    data?: CurrencyResponse
}

ChartJS.register(...registerables)

export const Chart = ({ data }: ChartProps) => {
    const { selectedCurrency } = useCurrency()

    return (
        <Line
            data={createData(data, selectedCurrency)}
            options={createOptions(selectedCurrency)}
        />
    )
}

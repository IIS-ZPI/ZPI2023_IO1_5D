import React from 'react'
import { useCurrency } from '../contexts/CurrencyContext.tsx'

const StatisticalMeasures: React.FC = () => {
    const { selectedCurrency } = useCurrency()

    return (
        <>
            <h2>Statistical Measures</h2>
            <p>Selected Currency: {selectedCurrency}</p>
        </>
    )
}

export default StatisticalMeasures

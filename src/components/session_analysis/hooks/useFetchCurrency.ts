import { useEffect, useState } from 'react'
import { createPath } from './useFetchCurrency.utils.ts'
import {
    State,
    CurrencyResponse,
    UseFetchCurrencyArgs,
} from './useFetchCurrency.types.ts'

export const useFetchCurrency = ({
    currency,
    startDate,
    endDate,
}: UseFetchCurrencyArgs) => {
    const [value, setValue] = useState<CurrencyResponse | undefined>(undefined)
    const [error, setError] = useState<Error | undefined>(undefined)
    const [state, setState] = useState<State>(State.Empty)

    const fetchCurrency = async ({
        currency,
        startDate,
        endDate,
    }: UseFetchCurrencyArgs) => {
        setState(State.Loading)

        const url = createPath(currency, startDate, endDate)

        try {
            const response = await fetch(url)
            if (response.status >= 300 || response.status <= 100) {
                throw new Error(response.statusText)
            }

            const data: CurrencyResponse = await response.json()

            setValue(data)
            setState(State.Success)
            setError(undefined)

            return data
        } catch (error) {
            if (error instanceof Error) {
                setError(error)
            } else {
                setError(new Error('Unknown server error'))
            }

            setValue(undefined)
            setState(State.Error)
        }

        return null
    }

    useEffect(() => {
        if (currency) {
            fetchCurrency({ currency, startDate, endDate })
        }
    }, [currency, startDate, endDate])

    return {
        state,
        error,
        value,
        fetchCurrency,
    }
}

export enum State {
    Loading = 'Loading',
    Error = 'Error',
    Success = 'Success',
    Empty = 'Empty',
}

export type UseFetchCurrencyArgs = {
    currency: string
    startDate?: string
    endDate?: string
}

export type CurrencyResponse = {
    code: string
    currency: string
    table: string
    rates: {
        no: string
        mid: number
        effectiveDate: string
    }[]
}

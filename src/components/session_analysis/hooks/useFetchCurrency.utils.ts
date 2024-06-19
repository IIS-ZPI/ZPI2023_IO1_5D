/**
 * Format date to YYYY-MM-DD format
 * @param date
 */
export const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')

    return `${year}-${month}-${day}`
}

export const createPath = (
    currency: string,
    startDate?: Date | string,
    endDate?: Date | string
) => {
    const path = ['https://api.nbp.pl/api/exchangerates/rates/a/']

    if (currency) {
        path.push(currency + '/')
    }

    if (startDate) {
        path.push(
            startDate instanceof Date ? formatDate(startDate) : startDate + '/'
        )

        if (endDate) {
            path.push(
                endDate instanceof Date ? formatDate(endDate) : endDate + '/'
            )
        }
    }

    return path.join('')
}

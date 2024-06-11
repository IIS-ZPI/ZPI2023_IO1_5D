import { useCurrency } from '../../../contexts/CurrencyContext.tsx'
import { DatePicker } from '../components/DatePicker/DatePicker.tsx'
import { Divider } from '../components/Divider/Divider.tsx'
import { Option } from '../components/Select/Option.tsx'
import { Select } from '../components/Select/Select.tsx'
import { formatDate } from '../hooks/useFetchCurrency.utils.ts'
import { calculateEndPeriod } from '../SessionAnalysis.utils.ts'

type CurrencyBarSectionProps = {
    startTime: Date
    timePeriod: string
    setStartTime: (value: Date) => void
    setTimePeriod: (value: string) => void
}

const PERIODS_OPTIONS = [
    { value: '365', label: '1 year' },
    { value: '182', label: 'Half year' },
    { value: '90', label: '3 months' },
    { value: '30', label: '1 month' },
]

export const CurrencyBarSection = ({
    startTime,
    setStartTime,
    setTimePeriod,
    timePeriod,
}: CurrencyBarSectionProps) => {
    const { selectedCurrency, currencies, setSelectedCurrency } = useCurrency()

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center text-xl font-semibold">
                <h1 className="text-3xl font-bold ">{selectedCurrency}</h1>
                <h6>
                    {formatDate(startTime)}
                    <span> - </span>
                    {formatDate(calculateEndPeriod(startTime, timePeriod))}
                </h6>
            </div>
            <Divider />
            <div>
                <div className="flex justify-between">
                    <div className="w-1/6">
                        <Select
                            label="Currency"
                            value={selectedCurrency}
                            className="w-48"
                            onChange={(value) => {
                                if (value) {
                                    setSelectedCurrency(value)
                                }
                            }}
                        >
                            {currencies.map(({ code, name }, index) => (
                                <Option
                                    key={index}
                                    value={code}
                                    disabled={code === 'PLN'}
                                >
                                    {name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <DatePicker
                            selectedDate={startTime}
                            setSelectedDate={(date) => {
                                if (date) {
                                    setStartTime(date)
                                }
                            }}
                        />
                        <Select
                            value={timePeriod}
                            onChange={(value) => {
                                if (value) {
                                    setTimePeriod(value)
                                }
                            }}
                        >
                            {PERIODS_OPTIONS.map(({ label, value }, index) => (
                                <Option key={index} value={value}>
                                    {label}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
}

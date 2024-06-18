import classnames from 'classnames'
import { formatDate } from 'date-fns'
import { useState } from 'react'
import { Label } from '../Lablel/Label.tsx'

export type CalendarChangeValues = {
    valueAsDate: Date | null
    value: string
}

type CalendarProps = {
    name?: string
    onChange: ({ valueAsDate, value }: CalendarChangeValues) => void
    label: string
    placeholder: string
    value: Date | string | number | undefined
    max?: Date | string | number | undefined
    className?: string
}

const transformDate = (
    value: CalendarProps['value']
): string | number | undefined => {
    if (!value) {
        return undefined
    }

    return value instanceof Date ? formatDate(value, 'yyyy-MM-dd') : value
}

export const Calendar = ({
    name,
    value,
    label,
    placeholder,
    onChange,
    max,
    className,
}: CalendarProps) => {
    const [isFocused, setIsFocused] = useState(false)

    const handleFocus = () => setIsFocused(true)
    const handleBlur = () => setIsFocused(false)

    const isLabelUp = isFocused || !!value

    return (
        <div className={classnames('relative', className)}>
            <Label name={name} isUp={isLabelUp}>
                {label}
            </Label>
            <input
                name="start-date"
                type="date"
                className={classnames(
                    'block appearance-none w-full bg-white border border-gray_for_text px-4 py-2 rounded-lg',
                    'shadow leading-tight focus:outline-none focus:shadow-outline'
                )}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={({ target }) =>
                    onChange({
                        valueAsDate: target.valueAsDate,
                        value: target.value,
                    })
                }
                placeholder={placeholder}
                value={transformDate(value)}
                max={transformDate(max)}
            />
        </div>
    )
}

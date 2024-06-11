import classnames from 'classnames'
import { useState } from 'react'
import { SelectProps } from './Select.types.ts'

export const Select = ({
    children,
    name,
    label,
    onChange,
    value,
    className,
}: SelectProps) => {
    const [isFocused, setIsFocused] = useState(false)

    const handleFocus = () => setIsFocused(true)
    const handleBlur = () => setIsFocused(false)

    const isLabelUp = isFocused || value

    return (
        <div className={classnames('relative', className)}>
            <label
                htmlFor={name}
                className={classnames(
                    'absolute left-3 transform transition-all duration-300 text-gray-500 px-2 bg-white',
                    { ['-top-2 text-xs']: isLabelUp },
                    { ['top-2.5']: !isLabelUp }
                )}
            >
                {label}
            </label>
            <select
                id={name}
                name={name}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="border rounded w-full bg-transparent"
                value={value}
                onChange={(event) => onChange(event.target.value)}
            >
                {children}
            </select>
        </div>
    )
}

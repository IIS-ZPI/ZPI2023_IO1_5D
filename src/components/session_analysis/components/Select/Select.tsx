import classnames from 'classnames'
import { useState } from 'react'
import { Label } from '../Lablel/Label.tsx'
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

    const isLabelUp = isFocused || !!value

    return (
        <div className={classnames('relative', className)}>
            {label && (
                <Label name={name} isUp={isLabelUp}>
                    {label}
                </Label>
            )}
            <select
                id={name}
                name={name}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={classnames(
                    'border rounded w-full bg-transparent',
                    'block appearance-none w-full bg-white border border-gray_for_text px-4 py-2 rounded-lg',
                    'shadow leading-tight focus:outline-none focus:shadow-outline'
                )}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            >
                {children}
            </select>
        </div>
    )
}

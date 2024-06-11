import { ReactNode } from 'react'

export type OptionProps = {
    value: string
    children: ReactNode
    label?: string
    disabled?: boolean
}

export const Option = ({ value, label, disabled, children }: OptionProps) => (
    <option value={value} disabled={disabled}>
        {children || label}
    </option>
)

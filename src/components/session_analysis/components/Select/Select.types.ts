import { ReactNode } from 'react'

export type SelectProps = {
    name?: string
    label?: string
    value: string
    onChange: (value: string | undefined) => void
    children: ReactNode
    className?: string
}

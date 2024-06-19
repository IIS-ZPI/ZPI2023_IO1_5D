import classnames from 'classnames'
import { ReactNode } from 'react'

type LabelProps = {
    name?: string
    isUp?: boolean
    children?: ReactNode
}

export const Label = ({ isUp, name, children }: LabelProps) => (
    <label
        htmlFor={name}
        className={classnames(
            'absolute left-2 transform transition-all duration-300 text-gray-500 px-2 bg-white',
            { ['-top-2 text-xs']: isUp },
            { ['top-2.5']: !isUp }
        )}
    >
        {children}
    </label>
)

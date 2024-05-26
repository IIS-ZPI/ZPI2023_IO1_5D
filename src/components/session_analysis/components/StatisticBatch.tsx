import { HiArrowDown, HiArrowUp, HiMinus } from 'react-icons/hi'
import classnames from 'classnames'

export type StatisticBatchProps = {
    icon: 'arrowUp' | 'arrowDown' | 'minus'
    text: 'Growth periods' | 'Slack periods' | 'Unchanged periods'
    value: number
    className?: string
}

const IconComponent = {
    arrowUp: () => <HiArrowUp color={'green'} size={'15'} />,
    arrowDown: () => <HiArrowDown size={'15'} color={'red'} />,
    minus: () => <HiMinus size={'15'} color={'gray'} />,
}

export const StatisticBatch = ({
    icon,
    text,
    value,
    className,
}: StatisticBatchProps) => {
    const SelectedIcon = IconComponent[icon]

    return (
        <div
            className={classnames(
                'flex gap-3 border rounded-lg px-2 py-1 m-2 border-custom-medium',
                className
            )}
        >
            <div className="flex flex-shrink-0 items-center">
                <div className="flex justify-center items-center w-8 h-8 rounded-full border-2 border-custom-light">
                    <SelectedIcon />
                </div>
            </div>

            <div className={'flex-grow w-full text-center'}>
                <p className="font-normal text-medium flex-shrink-0 text-custom-medium">
                    {text}
                </p>
                <div className="flex justify-center w-full flex-grow">
                    <span className="font-bold text-sm">{value}</span>
                </div>
            </div>
        </div>
    )
}

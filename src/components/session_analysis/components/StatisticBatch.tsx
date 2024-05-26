import { HiArrowDown, HiArrowUp, HiMinus } from 'react-icons/hi'

type StatisticBatchProps = {
    icon: 'arrowUp' | 'arrowDown' | 'minus'
    text: 'Growth periods' | 'Slack periods' | 'Unchanged periods'
    value: number
}
//
// const iconColors = {
//     arrowUp: 'text-green-500',
//     arrowDown: 'text-red-500',
//     minus: 'text-gray-800',
// }

const IconComponent = {
    arrowUp: () => <HiArrowUp color={'green'} size={'15'} />,
    arrowDown: () => <HiArrowDown size={'15'} color={'red'} />,
    minus: () => <HiMinus size={'15'} color={'gray'} />,
}

export const StatisticBatch = ({ icon, text, value }: StatisticBatchProps) => {
    const SelectedIcon = IconComponent[icon]

    return (
        <div
            className={'flex gap-3 border border-gray-300 rounded-lg px-2 py-1'}
        >
            <div className="rounded-full w-8 h-8 overflow-hidden border-2 bg-gray-200 p-1 flex items-center justify-center m-auto">
                <SelectedIcon />
            </div>

            <div className={'flex-grow'}>
                <div className="font-normal text-gray-400">{text}</div>
                <div className="flex justify-center w-full mt-2">
                    <span className="font-bold text-sm">{value}</span>
                </div>
            </div>
        </div>
    )
}

import { useRef } from 'react'
import Flatpickr from 'react-flatpickr'
import { HiChevronDown } from 'react-icons/hi2'

import 'flatpickr/dist/themes/material_blue.css'

type DateProps = {
    selectedDate: Date
    setSelectedDate: (date: Date | undefined) => void
}

type FlatpickrInstance = {
    flatpickr: {
        isOpen: boolean
        open: VoidFunction
    }
}
export const DatePicker = ({ selectedDate, setSelectedDate }: DateProps) => {
    const calendarRef = useRef<FlatpickrInstance>(null)

    const clickHandler = () => {
        const flatpickr = calendarRef.current?.flatpickr
        if (flatpickr && !flatpickr.isOpen) {
            flatpickr.open()
        }
    }

    return (
        <div
            className="border rounded w-full p-2 relative"
            onClick={clickHandler}
        >
            <Flatpickr
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                ref={calendarRef}
                className="w-24"
                data-enable-time={false}
                value={selectedDate}
                onChange={([date]) => {
                    if (date) {
                        setSelectedDate(date)
                    }
                }}
                options={{
                    mode: 'single',
                    dateFormat: 'Y-m-d',
                }}
            />
            <div className="absolute right-3 top-3">
                <HiChevronDown />
            </div>
        </div>
    )
}

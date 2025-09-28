import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DatePickerPresenter from './DatePickerPresenter'
import { format, parse, isValid } from 'date-fns'
import toast from 'react-hot-toast'

interface DatePickerProps {
    selectedDates: string[]
    onDatesChange: (dates: string[]) => void
}

const DatePickerContainer = ({ selectedDates, onDatesChange }: DatePickerProps) => {
    const [pickerType, setPickerType] = useState<'single' | 'range'>('single')
    const [inputDate, setInputDate] = useState('')
    const [rangeStart, setRangeStart] = useState('')
    const [rangeEnd, setRangeEnd] = useState('')
    const [isAdding, setIsAdding] = useState(false)

    const formatDateToAPI = (date: string): string => {
        const parsed = parse(date, 'yyyy-MM-dd', new Date())
        if (!isValid(parsed)) return ''
        return format(parsed, 'ddMMyyyy')
    }

    const formatDateFromAPI = (apiDate: string): string => {
        if (apiDate.length !== 8) return apiDate
        const day = apiDate.slice(0, 2)
        const month = apiDate.slice(2, 4)
        const year = apiDate.slice(4, 8)
        return `${year}-${month}-${day}`
    }

    const addSingleDate = () => {
        if (!inputDate) {
            toast.error('Please select a date')
            return
        }
        const apiFormat = formatDateToAPI(inputDate)
        if (!apiFormat) {
            toast.error('Invalid date format')
            return
        }
        setIsAdding(true)
        setTimeout(() => {
            onDatesChange([...selectedDates, apiFormat])
            setInputDate('')
            setIsAdding(false)
            toast.success('Date added successfully')
        }, 300)
    }

    const addRange = () => {
        if (!rangeStart || !rangeEnd) {
            toast.error('Please select both start and end dates')
            return
        }
        const startAPI = formatDateToAPI(rangeStart)
        const endAPI = formatDateToAPI(rangeEnd)
        if (!startAPI || !endAPI) {
            toast.error('Invalid date format')
            return
        }
        if (rangeStart > rangeEnd) {
            toast.error('Start date should be before end date')
            return
        }
        setIsAdding(true)
        setTimeout(() => {
            const rangeDates = generateDateRange(startAPI, endAPI)
            onDatesChange([...selectedDates, ...rangeDates])
            setRangeStart('')
            setRangeEnd('')
            setIsAdding(false)
            toast.success('Date range added successfully')
        }, 300)
    }

    const generateDateRange = (start: string, end: string): string[] => {
        const dates: string[] = []
        let current = parseDate(start)
        const endDate = parseDate(end)
        while (current <= endDate) {
            dates.push(formatDate(current))
            current = addDays(current, 1)
        }
        return dates
    }

    const parseDate = (apiDate: string): Date => {
        const day = parseInt(apiDate.slice(0, 2))
        const month = parseInt(apiDate.slice(2, 4)) - 1
        const year = parseInt(apiDate.slice(4, 8))
        return new Date(year, month, day)
    }

    const formatDate = (date: Date): string => {
        return format(date, 'ddMMyyyy')
    }

    const addDays = (date: Date, days: number): Date => {
        const result = new Date(date)
        result.setDate(result.getDate() + days)
        return result
    }

    const removeDate = (dateToRemove: string) => {
        onDatesChange(selectedDates.filter(date => date !== dateToRemove))
    }

    const clearAllDates = () => {
        onDatesChange([])
        toast.success('All dates cleared')
    }

    return (
        <DatePickerPresenter
            pickerType={pickerType}
            setPickerType={setPickerType}
            inputDate={inputDate}
            setInputDate={setInputDate}
            rangeStart={rangeStart}
            setRangeStart={setRangeStart}
            rangeEnd={rangeEnd}
            setRangeEnd={setRangeEnd}
            isAdding={isAdding}
            selectedDates={selectedDates}
            formatDateFromAPI={formatDateFromAPI}
            addSingleDate={addSingleDate}
            addRange={addRange}
            removeDate={removeDate}
            clearAllDates={clearAllDates}
        />
    )
}

export default DatePickerContainer
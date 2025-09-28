import { useState, useEffect } from 'react'
import PerformancePresenter from './PerformancePresenter'
import { useTopGainerLoser, useLastDownloadDate } from '../../hooks/useApi'

const PerformanceContainer = () => {
    const { data: lastDate } = useLastDownloadDate()
    const [displayDate, setDisplayDate] = useState('')

    useEffect(() => {
        if (lastDate) {
            setDisplayDate(formatToDisplay(lastDate))
        }
    }, [lastDate])

    const apiDate = formatToAPI(displayDate)

    const { data, isLoading, error } = useTopGainerLoser(apiDate || undefined)

    return (
        <PerformancePresenter
            displayDate={displayDate}
            setDisplayDate={setDisplayDate}
            data={data}
            isLoading={isLoading}
            error={error}
        />
    )
}

const formatToDisplay = (apiDate: string): string => {
    if (!apiDate || apiDate.length !== 8) return ''
    const day = apiDate.slice(0, 2)
    const month = apiDate.slice(2, 4)
    const year = apiDate.slice(4, 8)
    return `${year}-${month}-${day}`
}

const formatToAPI = (displayDate: string): string => {
    if (!displayDate) return ''
    const [year, month, day] = displayDate.split('-')
    return `${day}${month}${year}`
}

export default PerformanceContainer
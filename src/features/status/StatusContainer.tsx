// src/features/status/StatusContainer.tsx
import StatusPresenter from './StatusPresenter'
import { format } from 'date-fns'
import { useLastDownloadDate } from '../../hooks/useApi'

interface StatusProps {
    currentDate?: { date: string; dayOfWeek: string }
}

const StatusContainer = ({ currentDate }: StatusProps) => {
    const { data: lastDownloadDate, isLoading } = useLastDownloadDate()

    const formattedCurrentDate = currentDate ? currentDate : {
        date: format(new Date(), 'yyyy-MM-dd'),
        dayOfWeek: format(new Date(), 'EEEE')
    }

    return (
        <StatusPresenter
            currentDate={formattedCurrentDate}
            lastDownloadDate={lastDownloadDate}
            isLoading={isLoading}
        />
    )
}

export default StatusContainer
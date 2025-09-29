import { useState } from 'react';
import { useVolumeRatio, useCurrentDate, useLastDownloadDate } from '../../hooks/useApi';
import VolumePresenter from './VolumePresenter';

const VolumeContainer: React.FC = () => {
    const { data: currentDateData } = useCurrentDate();
    const { data: lastDownloadDate } = useLastDownloadDate();

    const [dates, setDates] = useState<string[]>(['', '']);

    const { mutate, data, isPending, error } = useVolumeRatio();

    // When user changes input, store as display format
    const handleDateChange = (index: number, value: string) => {
        const newDates = [...dates];
        newDates[index] = value;
        setDates(newDates);
    };

    // On submit, convert to API format before sending
    const handleSubmit = () => {
        if (dates[0] && dates[1]) {
            const apiDates = [formatToAPI(dates[0]), formatToAPI(dates[1])];
            mutate(apiDates);
        }
    };

    // Pass display format to presenter
    return (
        <VolumePresenter
            dates={dates}
            onDateChange={handleDateChange}
            onSubmit={handleSubmit}
            volumeData={data}
            isLoading={isPending}
            error={error}
            currentDate={currentDateData?.date}
            lastDownloadDate={lastDownloadDate}
        />
    );
}

// Converts API date (ddMMyyyy) to input value (yyyy-MM-dd)
export const formatToDisplay = (apiDate: string): string => {
    if (!apiDate || apiDate.length !== 8) return '';
    const day = apiDate.slice(0, 2);
    const month = apiDate.slice(2, 4);
    const year = apiDate.slice(4, 8);
    return `${year}-${month}-${day}`;
};

// Converts input value (yyyy-MM-dd) to API date (ddMMyyyy)
export const formatToAPI = (displayDate: string): string => {
    if (!displayDate || displayDate.length !== 10) return '';
    const [year, month, day] = displayDate.split('-');
    return `${day}${month}${year}`;
};

export default VolumeContainer;
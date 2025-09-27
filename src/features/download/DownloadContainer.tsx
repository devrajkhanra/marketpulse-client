// src/features/download/DownloadContainer.tsx
import { useState } from 'react'
import DownloadPresenter from './DownloadPresenter'
import { useDownloadCSVs } from '../../hooks/useApi'
import toast from 'react-hot-toast'

interface DownloadProps {
    selectedDates: string[]
    onClearDates: () => void
}

const DownloadContainer = ({ selectedDates, onClearDates }: DownloadProps) => {
    const [downloadedFiles, setDownloadedFiles] = useState<string[]>([])
    const downloadMutation = useDownloadCSVs()

    const handleDownload = async () => {
        if (selectedDates.length === 0) {
            toast.error('Please select at least one date')
            return
        }

        try {
            const result = await downloadMutation.mutateAsync(selectedDates)
            setDownloadedFiles(result)
            toast.success(`Successfully downloaded ${result.length} files`)
            onClearDates()
        } catch (error) {
            toast.error('Failed to download files')
            console.error('Download error:', error)
        }
    }

    const dataTypes = [
        {
            icon: 'TrendingUp',
            name: 'Stocks',
            description: 'Stock market data',
            color: 'var(--primary-500)'
        },
        {
            icon: 'BarChart3',
            name: 'Indices',
            description: 'Market indices data',
            color: 'var(--secondary-500)'
        },
        {
            icon: 'Database',
            name: 'Market Analysis',
            description: 'MA data files',
            color: 'var(--success-500)'
        },
        {
            icon: 'FileText',
            name: 'Broad Market',
            description: 'Nifty 50 list',
            color: 'var(--warning-500)'
        }
    ]

    return (
        <DownloadPresenter
            selectedDates={selectedDates}
            downloadedFiles={downloadedFiles}
            downloadMutation={downloadMutation}
            handleDownload={handleDownload}
            dataTypes={dataTypes}
        />
    )
}

export default DownloadContainer
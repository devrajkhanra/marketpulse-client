import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, FileText, BarChart3, TrendingUp, Database, CheckCircle, AlertCircle } from 'lucide-react'
import { useDownloadCSVs } from '../hooks/useApi'
import toast from 'react-hot-toast'
import './DownloadSection.css'

interface DownloadSectionProps {
  selectedDates: string[]
  onClearDates: () => void
}

const DownloadSection = ({ selectedDates, onClearDates }: DownloadSectionProps) => {
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
      icon: TrendingUp,
      name: 'Stocks',
      description: 'Stock market data',
      color: 'var(--primary-500)'
    },
    {
      icon: BarChart3,
      name: 'Indices',
      description: 'Market indices data',
      color: 'var(--secondary-500)'
    },
    {
      icon: Database,
      name: 'Market Analysis',
      description: 'MA data files',
      color: 'var(--success-500)'
    },
    {
      icon: FileText,
      name: 'Broad Market',
      description: 'Nifty 50 list',
      color: 'var(--warning-500)'
    }
  ]

  return (
    <div className="download-section">
      <motion.div 
        className="download-header"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="download-icon">
          <Download size={24} />
        </div>
        <div className="download-header-content">
          <h2 className="download-title">Download NSE Data</h2>
          <p className="download-subtitle">
            Download comprehensive market data for selected dates
          </p>
        </div>
      </motion.div>

      <motion.div 
        className="data-types-grid"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {dataTypes.map((type, index) => (
          <motion.div
            key={type.name}
            className="data-type-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="data-type-icon" style={{ color: type.color }}>
              <type.icon size={20} />
            </div>
            <div className="data-type-content">
              <h3 className="data-type-name">{type.name}</h3>
              <p className="data-type-description">{type.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="download-controls"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="download-info">
          <div className="download-stats">
            <span className="stat-item">
              <strong>{selectedDates.length}</strong> dates selected
            </span>
            <span className="stat-item">
              <strong>{selectedDates.length * 4}</strong> files to download
            </span>
          </div>
          
          {selectedDates.length > 0 && (
            <div className="selected-dates-preview">
              <span className="preview-label">Selected dates:</span>
              <div className="dates-preview">
                {selectedDates.slice(0, 3).map(date => (
                  <span key={date} className="date-chip">{date}</span>
                ))}
                {selectedDates.length > 3 && (
                  <span className="date-chip more">+{selectedDates.length - 3} more</span>
                )}
              </div>
            </div>
          )}
        </div>

        <motion.button
          onClick={handleDownload}
          disabled={selectedDates.length === 0 || downloadMutation.isPending}
          className={`download-btn ${selectedDates.length === 0 ? 'disabled' : ''}`}
          whileHover={selectedDates.length > 0 ? { scale: 1.02 } : {}}
          whileTap={selectedDates.length > 0 ? { scale: 0.98 } : {}}
        >
          {downloadMutation.isPending ? (
            <>
              <div className="loading-spinner" />
              <span>Downloading...</span>
            </>
          ) : (
            <>
              <Download size={20} />
              <span>Download Data</span>
            </>
          )}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {downloadedFiles.length > 0 && (
          <motion.div 
            className="download-results"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="results-header">
              <CheckCircle size={20} className="success-icon" />
              <h3>Download Complete</h3>
            </div>
            <div className="results-list">
              {downloadedFiles.slice(0, 5).map((file, index) => (
                <motion.div
                  key={file}
                  className="result-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <FileText size={16} />
                  <span className="file-path">{file.split('/').pop()}</span>
                </motion.div>
              ))}
              {downloadedFiles.length > 5 && (
                <div className="result-item more-files">
                  <AlertCircle size={16} />
                  <span>+{downloadedFiles.length - 5} more files downloaded</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DownloadSection
import { motion, AnimatePresence } from 'framer-motion'
import { Download, FileText, BarChart3, TrendingUp, Database, CheckCircle, AlertCircle, Calendar, Beef } from 'lucide-react'
import './download-section.css'

interface DownloadPresenterProps {
    selectedDates: string[]
    downloadedFiles: string[]
    downloadMutation: any
    handleDownload: () => void
    dataTypes: { icon: string; name: string; description: string; color: string }[]
}

const DownloadPresenter = ({ selectedDates, downloadedFiles, downloadMutation, handleDownload, dataTypes }: DownloadPresenterProps) => {
    const iconMap = {
        TrendingUp,
        BarChart3,
        Database,
        FileText
    }

    return (
        <div className="download-section">
            <motion.div
                className="download-header"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="download-icon">
                    <Beef size={32} stroke={'#4e7294'} />
                </div>
                <div className="download-header-content">
                    <h2 className="download-title">Download NSE Data</h2>
                    <p className="download-subtitle">
                        Download comprehensive market data for selected dates
                    </p>
                </div>
            </motion.div>

            <motion.div
                className="data-types-bar"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                {dataTypes.map((type, index) => {
                    const Icon = iconMap[type.icon as keyof typeof iconMap]
                    return (
                        <motion.div
                            key={type.name}
                            className="data-type-bar-item"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                        >
                            <div className="data-type-icon" style={{ color: type.color }}>
                                <Icon size={24} stroke={'#4e7294'} />
                            </div>
                            <div className="data-type-content">
                                <h3 className="data-type-name">{type.name}</h3>
                                <p className="data-type-description">{type.description}</p>
                            </div>
                        </motion.div>
                    )
                })}
            </motion.div>

            <motion.div
                className="download-controls"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="download-stats">
                    <div className="stat-item">
                        <Calendar size={16} stroke={'var(--gray-700)'} strokeWidth={1.5} />
                        <span>{selectedDates.length} dates selected</span>
                    </div>
                    <div className="stat-item">
                        <Database size={16} stroke={'var(--gray-700)'} strokeWidth={1.5} />
                        <span>{dataTypes.length} data types</span>
                    </div>
                </div>

                {selectedDates.length > 0 && (
                    <div className="preview-section">
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
                            <Download size={20} strokeWidth={1} />
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

export default DownloadPresenter
import { motion } from 'framer-motion'
import { Calendar, Clock, Database, CheckCircle, Beef } from 'lucide-react'
import './status-card.css'

interface StatusPresenterProps {
    currentDate: { date: string; dayOfWeek: string }
    lastDownloadDate: string | null
    isLoading: boolean
}

const StatusPresenter = ({ currentDate, lastDownloadDate, isLoading }: StatusPresenterProps) => {
    return (
        <div className="status-card">
            <motion.div
                className="status-header"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="status-icon">
                    <Beef size={24} />
                </div>
                <h2 className="status-title">System Status</h2>
            </motion.div>

            <div className="status-grid">
                <motion.div
                    className="status-item"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="status-item-icon">
                        <Calendar size={18} />
                    </div>
                    <div className="status-item-content">
                        <span className="status-label">Current Date</span>
                        <span className="status-value">
                            {currentDate.date}
                            <span className="status-day">({currentDate.dayOfWeek})</span>
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    className="status-item"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="status-item-icon">
                        <Clock size={18} />
                    </div>
                    <div className="status-item-content">
                        <span className="status-label">Last Download</span>
                        <span className="status-value">
                            {isLoading ? (
                                <span className="loading-text">Loading...</span>
                            ) : lastDownloadDate ? (
                                lastDownloadDate
                            ) : (
                                <span className="no-data">No downloads yet</span>
                            )}
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    className="status-item"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="status-item-icon status-online">
                        <CheckCircle size={18} />
                    </div>
                    <div className="status-item-content">
                        <span className="status-label">API Status</span>
                        <span className="status-value status-online-text">Online</span>
                    </div>
                </motion.div>
            </div>

            <motion.div
                className="status-footer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <div className="status-indicator">
                    <div className="pulse-dot"></div>
                    <span>System operational</span>
                </div>
            </motion.div>
        </div>
    )
}

export default StatusPresenter
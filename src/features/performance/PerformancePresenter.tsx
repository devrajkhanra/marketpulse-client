// src/features/performance/PerformancePresenter.tsx
import { motion } from 'framer-motion'
import { ArrowUp, ArrowDown, Calendar } from 'lucide-react'
import './performance-card.css'

interface PerformancePresenterProps {
    displayDate: string
    setDisplayDate: (date: string) => void
    data?: { topGainers: { symbol: string; percentage: number }[]; topLosers: { symbol: string; percentage: number }[] }
    isLoading: boolean
    error: any
}

const PerformancePresenter = ({ displayDate, setDisplayDate, data, isLoading, error }: PerformancePresenterProps) => {
    return (
        <div className="performance-card">
            <motion.div
                className="performance-header"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="performance-icon">
                    <ArrowUp size={24} />
                </div>
                <h2 className="performance-title">Market Performance</h2>
            </motion.div>

            <motion.div
                className="date-selector"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <div className="date-input-wrapper">
                    <Calendar className="input-icon" size={16} />
                    <input
                        type="date"
                        value={displayDate}
                        onChange={(e) => setDisplayDate(e.target.value)}
                        className="date-input"
                        placeholder="Select Date"
                    />
                </div>
                <span className="date-note">
                    {displayDate ? `Showing data for ${displayDate}` : 'Showing latest available data'}
                </span>
            </motion.div>

            {isLoading ? (
                <div className="loading-state">Loading performance data...</div>
            ) : error ? (
                <div className="error-state">Failed to load data. Please try again.</div>
            ) : data ? (
                <div className="performance-grid">
                    <motion.div
                        className="gainers-section"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="section-title">Top 5 Gainers</h3>
                        <div className="list">
                            {data.topGainers.map((gainer, index) => (
                                <motion.div
                                    key={gainer.symbol}
                                    className="list-item gainer"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                                >
                                    <ArrowUp size={16} className="item-icon" />
                                    <span className="symbol">{gainer.symbol}</span>
                                    <span className="percentage">+{gainer.percentage}%</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="losers-section"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h3 className="section-title">Top 5 Losers</h3>
                        <div className="list">
                            {data.topLosers.map((loser, index) => (
                                <motion.div
                                    key={loser.symbol}
                                    className="list-item loser"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                                >
                                    <ArrowDown size={16} className="item-icon" />
                                    <span className="symbol">{loser.symbol}</span>
                                    <span className="percentage">{loser.percentage}%</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            ) : (
                <div className="empty-state">No performance data available</div>
            )}
        </div>
    )
}

export default PerformancePresenter
// src/features/header/HeaderPresenter.tsx
import { motion } from 'framer-motion'
import { TrendingUp, Activity, BarChart3 } from 'lucide-react'
import './header.css'

const HeaderPresenter = () => {
    return (
        <motion.header
            className="header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="header-container">
                <motion.div
                    className="logo-section"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <div className="logo-icon">
                        <TrendingUp size={28} />
                        <Activity size={20} className="logo-accent" />
                    </div>
                    <div className="logo-text">
                        <h1 className="logo-title">MarketPulse</h1>
                        <span className="logo-subtitle">NSE Data Manager</span>
                    </div>
                </motion.div>

                <motion.div
                    className="header-stats"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="stat-item">
                        <BarChart3 size={16} />
                        <span>Live Data</span>
                    </div>
                </motion.div>
            </div>
        </motion.header>
    )
}

export default HeaderPresenter
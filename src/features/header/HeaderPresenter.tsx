import { motion } from 'framer-motion'
import { Beef, TrendingUp, Activity } from 'lucide-react'
import type { PageType } from '../../types'
import './header.css'

interface HeaderPresenterProps {
    currentPage: PageType;
    onPageChange: (page: PageType) => void;
}

const HeaderPresenter = ({ currentPage, onPageChange }: HeaderPresenterProps) => {
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
                        <Beef size={28} />
                        <Activity size={20} className="logo-accent" />
                    </div>
                    <div className="logo-text">
                        <h1 className="logo-title">MarketHive</h1>
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
                        <TrendingUp size={16} />
                        <span>Live Data</span>
                    </div>
                    <nav className="nav">
                        {['dashboard', 'data-download', 'analytics', 'settings'].map((page) => (
                            <button
                                key={page}
                                className={currentPage === page ? 'active' : ''}
                                onClick={() => onPageChange(page as PageType)}
                            >
                                {page.charAt(0).toUpperCase() + page.slice(1)}
                            </button>
                        ))}
                    </nav>
                </motion.div>
            </div>
        </motion.header>
    );
}

export default HeaderPresenter
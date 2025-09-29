import { motion } from 'framer-motion'
import { BarChart2, Settings, Beef, LayoutDashboard, DownloadCloud } from 'lucide-react'
import './sidebar.css'
import type { SectionType } from '../../types'

interface SidebarPresenterProps {
    activeSection: SectionType;
    onSectionChange: (section: SectionType) => void;
}

const SidebarPresenter = ({ activeSection, onSectionChange }: SidebarPresenterProps) => {
    return (
        <motion.div
            className="sidebar"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="sidebar-logo">
                <Beef size={32} strokeWidth="1.5" color="#FFC107" />
            </div>
            <motion.div
                className="sidebar-items"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                <div
                    className={`sidebar-item ${activeSection === 'overview' ? 'active' : ''}`}
                    onClick={() => onSectionChange('overview')}
                >
                    <LayoutDashboard />
                    <span>Overview</span>
                </div>
                <div
                    className={`sidebar-item ${activeSection === 'download' ? 'active' : ''}`}
                    onClick={() => onSectionChange('download')}
                >
                    <DownloadCloud />
                    <span>Download</span>
                </div>
                <div
                    className={`sidebar-item ${activeSection === 'performance' ? 'active' : ''}`}
                    onClick={() => onSectionChange('performance')}
                >
                    <BarChart2 />
                    <span>Performance</span>
                </div>
                <div
                    className={`sidebar-item ${activeSection === 'settings' ? 'active' : ''}`}
                    onClick={() => onSectionChange('settings')}
                >
                    <Settings />
                    <span>Settings</span>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default SidebarPresenter
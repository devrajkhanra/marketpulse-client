import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Home, Download, BarChart3, Settings } from 'lucide-react'
import { PageType, NavigationItem } from '../types'
import './Navigation.css'

interface NavigationProps {
  currentPage: PageType
  onPageChange: (page: PageType) => void
}

const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    description: 'Overview and insights'
  },
  {
    id: 'data-download',
    label: 'Data Download',
    icon: Download,
    description: 'Download NSE market data'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    description: 'Market analysis tools'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    description: 'App configuration'
  }
]

const Navigation = ({ currentPage, onPageChange }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handlePageChange = (page: PageType) => {
    onPageChange(page)
    setIsOpen(false)
  }

  return (
    <div className="navigation" ref={menuRef}>
      <motion.button
        className={`nav-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Menu size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="nav-menu"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => handlePageChange(item.id)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="nav-item-icon">
                  <item.icon size={20} />
                </div>
                <div className="nav-item-content">
                  <h3 className="nav-item-label">{item.label}</h3>
                  <p className="nav-item-description">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navigation
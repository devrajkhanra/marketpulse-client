import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from './features/sidebar/SidebarContainer'
import PerformanceContainer from './features/performance/PerformanceContainer'
import DownloadContainer from './features/download/DownloadContainer'
import DatePickerContainer from './features/date-picker/DatePickerContainer'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState<'performance' | 'download'>('performance')
  const [selectedDates, setSelectedDates] = useState<string[]>([])

  return (
    <div className="app">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="main-content">
        <motion.div
          className="top-bar"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => setActiveSection('download')}
            className="download-btn"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9C27B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
        </motion.div>
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="card-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {activeSection === 'performance' ? (
              <PerformanceContainer />
            ) : (
              <>
                <DownloadContainer selectedDates={selectedDates} onClearDates={() => setSelectedDates([])} />
                <DatePickerContainer selectedDates={selectedDates} onDatesChange={setSelectedDates} />
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default App
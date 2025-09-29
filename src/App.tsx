import { useState } from 'react'
import type { SectionType } from './types'
import { motion } from 'framer-motion'
import Sidebar from './features/sidebar/SidebarContainer'
import PerformanceContainer from './features/performance/PerformanceContainer'
import DownloadContainer from './features/download/DownloadContainer'
import './App.css'
import AsideContainer from './features/aside/AsideContainer'

function App() {
  const [activeSection, setActiveSection] = useState<SectionType>('overview')
  const [selectedDates, setSelectedDates] = useState<string[]>([])

  return (
    <div className="app">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="main-content">
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
            {activeSection === 'performance' && <PerformanceContainer />}
            {activeSection === 'download' && <DownloadContainer selectedDates={selectedDates} onClearDates={() => setSelectedDates([])} />}

          </motion.div>
        </motion.div>
      </div>

      <AsideContainer activeSection={activeSection} onSectionChange={setActiveSection} selectedDates={selectedDates} onDatesChange={setSelectedDates} />
    </div>
  )
}

export default App
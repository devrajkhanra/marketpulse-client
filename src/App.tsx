// src/App.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import HeaderContainer from './features/header/HeaderContainer'
import DatePickerContainer from './features/date-picker/DatePickerContainer'
import DownloadContainer from './features/download/DownloadContainer'
import StatusContainer from './features/status/StatusContainer'
import PerformanceContainer from './features/performance/PerformanceContainer'
import { useCurrentDate } from './hooks/useApi'
import './App.css'

function App() {
  const [selectedDates, setSelectedDates] = useState<string[]>([])
  const { data: currentDate } = useCurrentDate()

  return (
    <div className="app">
      <HeaderContainer />

      <main className="main-content">
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid">
            <motion.div
              className="card-section"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <StatusContainer currentDate={currentDate} />
            </motion.div>

            <motion.div
              className="card-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <PerformanceContainer />
            </motion.div>

            <motion.div
              className="card-section"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <DatePickerContainer
                selectedDates={selectedDates}
                onDatesChange={setSelectedDates}
              />
            </motion.div>

            <motion.div
              className="card-section full-width"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <DownloadContainer
                selectedDates={selectedDates}
                onClearDates={() => setSelectedDates([])}
              />
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default App
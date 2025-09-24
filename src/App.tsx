import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import DatePicker from './components/DatePicker'
import DownloadSection from './components/DownloadSection'
import StatusCard from './components/StatusCard'
import { useCurrentDate } from './hooks/useApi'
import './App.css'

function App() {
  const [selectedDates, setSelectedDates] = useState<string[]>([])
  const { data: currentDate } = useCurrentDate()

  return (
    <div className="app">
      <Header />
      
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
              <StatusCard currentDate={currentDate} />
            </motion.div>

            <motion.div 
              className="card-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <DatePicker 
                selectedDates={selectedDates}
                onDatesChange={setSelectedDates}
              />
            </motion.div>

            <motion.div 
              className="card-section full-width"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <DownloadSection 
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
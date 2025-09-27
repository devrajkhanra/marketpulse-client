import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import DataDownload from './pages/DataDownload'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import { PageType } from './types'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard')

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'data-download':
        return <DataDownload />
      case 'analytics':
        return <Analytics />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="app">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <main className="main-content">
        <motion.div 
          className="container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          key={currentPage}
        >
          {renderPage()}
        </motion.div>
      </main>
    </div>
  )
}

export default App
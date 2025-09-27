import { motion } from 'framer-motion'
import { Download, BarChart3, TrendingUp, Database, CheckCircle, Clock, Users } from 'lucide-react'
import './Dashboard.css'

const Dashboard = () => {
  const features = [
    {
      icon: Download,
      title: 'Data Download',
      description: 'Download comprehensive NSE market data for any date range with support for multiple data types.',
      items: [
        'Stock market data',
        'Market indices',
        'Broad market analysis',
        'Historical data access'
      ]
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Advanced market analysis tools and insights to help you make informed trading decisions.',
      items: [
        'Technical indicators',
        'Market trends',
        'Performance metrics',
        'Custom reports'
      ]
    },
    {
      icon: Database,
      title: 'Data Management',
      description: 'Efficient data storage and retrieval system with real-time synchronization capabilities.',
      items: [
        'Automated backups',
        'Data validation',
        'Export options',
        'API integration'
      ]
    }
  ]

  return (
    <div className="dashboard">
      <motion.div 
        className="dashboard-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="hero-title">Welcome to MarketPulse</h1>
        <p className="hero-subtitle">
          Your comprehensive NSE data management platform with advanced analytics and real-time insights
        </p>
        
        <motion.div 
          className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div 
            className="hero-stat"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="stat-value">1000+</div>
            <div className="stat-label">Data Points</div>
          </motion.div>
          <motion.div 
            className="hero-stat"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="stat-value">24/7</div>
            <div className="stat-label">Availability</div>
          </motion.div>
          <motion.div 
            className="hero-stat"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="stat-value">99.9%</div>
            <div className="stat-label">Uptime</div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="dashboard-features"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="feature-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className="feature-header">
              <div className="feature-icon">
                <feature.icon size={24} />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
            </div>
            <p className="feature-description">{feature.description}</p>
            <ul className="feature-list">
              {feature.items.map((item, itemIndex) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 + itemIndex * 0.05 }}
                >
                  <CheckCircle size={16} />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Dashboard
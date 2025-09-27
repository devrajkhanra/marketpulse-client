import { motion } from 'framer-motion'
import { ChartBar as BarChart3, TrendingUp, ChartPie as PieChart, ChartLine as LineChart, Activity, Target } from 'lucide-react'
import './Analytics.css'

const Analytics = () => {
  const upcomingFeatures = [
    { icon: TrendingUp, text: 'Market Trend Analysis' },
    { icon: PieChart, text: 'Portfolio Distribution' },
    { icon: LineChart, text: 'Performance Charts' },
    { icon: Activity, text: 'Real-time Monitoring' },
    { icon: Target, text: 'Risk Assessment' },
    { icon: BarChart3, text: 'Custom Reports' }
  ]

  return (
    <div className="analytics">
      <motion.div 
        className="coming-soon"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="coming-soon-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <BarChart3 size={48} />
        </motion.div>
        
        <h1 className="coming-soon-title">Analytics Dashboard</h1>
        <p className="coming-soon-subtitle">
          Advanced market analytics and insights are coming soon. Get ready for powerful data visualization and analysis tools.
        </p>
        
        <motion.div 
          className="feature-preview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {upcomingFeatures.map((feature, index) => (
            <motion.div
              key={feature.text}
              className="preview-item"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="preview-icon">
                <feature.icon size={20} />
              </div>
              <span className="preview-text">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Analytics
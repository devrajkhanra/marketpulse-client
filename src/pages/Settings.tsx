import { motion } from 'framer-motion'
import { Settings as SettingsIcon, User, Bell, Shield, Database, Palette, Globe } from 'lucide-react'
import './Settings.css'

const Settings = () => {
  const upcomingFeatures = [
    { icon: User, text: 'User Profile Management' },
    { icon: Bell, text: 'Notification Preferences' },
    { icon: Shield, text: 'Security Settings' },
    { icon: Database, text: 'Data Export Options' },
    { icon: Palette, text: 'Theme Customization' },
    { icon: Globe, text: 'Language & Region' }
  ]

  return (
    <div className="settings">
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
          <SettingsIcon size={48} />
        </motion.div>
        
        <h1 className="coming-soon-title">Settings Panel</h1>
        <p className="coming-soon-subtitle">
          Comprehensive settings and configuration options are being developed. Customize your MarketPulse experience.
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

export default Settings
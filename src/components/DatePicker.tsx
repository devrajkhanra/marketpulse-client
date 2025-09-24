import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Plus, X, CalendarDays } from 'lucide-react'
import { format, parse, isValid } from 'date-fns'
import toast from 'react-hot-toast'
import './DatePicker.css'

interface DatePickerProps {
  selectedDates: string[]
  onDatesChange: (dates: string[]) => void
}

const DatePicker = ({ selectedDates, onDatesChange }: DatePickerProps) => {
  const [inputDate, setInputDate] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const formatDateToAPI = (date: string): string => {
    // Convert YYYY-MM-DD to DDMMYYYY
    const parsed = parse(date, 'yyyy-MM-dd', new Date())
    if (!isValid(parsed)) return ''
    return format(parsed, 'ddMMyyyy')
  }

  const formatDateFromAPI = (apiDate: string): string => {
    // Convert DDMMYYYY to YYYY-MM-DD for display
    if (apiDate.length !== 8) return apiDate
    const day = apiDate.slice(0, 2)
    const month = apiDate.slice(2, 4)
    const year = apiDate.slice(4, 8)
    return `${year}-${month}-${day}`
  }

  const addDate = () => {
    if (!inputDate) {
      toast.error('Please select a date')
      return
    }

    const apiFormat = formatDateToAPI(inputDate)
    if (!apiFormat) {
      toast.error('Invalid date format')
      return
    }

    if (selectedDates.includes(apiFormat)) {
      toast.error('Date already selected')
      return
    }

    setIsAdding(true)
    setTimeout(() => {
      onDatesChange([...selectedDates, apiFormat])
      setInputDate('')
      setIsAdding(false)
      toast.success('Date added successfully')
    }, 300)
  }

  const removeDate = (dateToRemove: string) => {
    onDatesChange(selectedDates.filter(date => date !== dateToRemove))
    toast.success('Date removed')
  }

  const clearAllDates = () => {
    onDatesChange([])
    toast.success('All dates cleared')
  }

  return (
    <div className="date-picker">
      <motion.div 
        className="date-picker-header"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="date-picker-icon">
          <CalendarDays size={24} />
        </div>
        <h2 className="date-picker-title">Select Dates</h2>
      </motion.div>

      <motion.div 
        className="date-input-section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="date-input-group">
          <div className="date-input-wrapper">
            <Calendar size={18} className="input-icon" />
            <input
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="date-input"
              placeholder="Select date"
            />
          </div>
          <motion.button
            onClick={addDate}
            className="add-date-btn"
            disabled={isAdding}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAdding ? (
              <div className="loading-spinner" />
            ) : (
              <Plus size={18} />
            )}
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        className="selected-dates-section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="selected-dates-header">
          <span className="selected-count">
            {selectedDates.length} date{selectedDates.length !== 1 ? 's' : ''} selected
          </span>
          {selectedDates.length > 0 && (
            <motion.button
              onClick={clearAllDates}
              className="clear-all-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear All
            </motion.button>
          )}
        </div>

        <div className="selected-dates-list">
          <AnimatePresence>
            {selectedDates.map((date, index) => (
              <motion.div
                key={date}
                className="selected-date-item"
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
              >
                <span className="date-text">
                  {formatDateFromAPI(date)}
                </span>
                <motion.button
                  onClick={() => removeDate(date)}
                  className="remove-date-btn"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={14} />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {selectedDates.length === 0 && (
            <motion.div 
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Calendar size={32} className="empty-icon" />
              <p>No dates selected</p>
              <span>Add dates to download NSE data</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default DatePicker
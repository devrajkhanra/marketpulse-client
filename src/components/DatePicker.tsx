import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Plus, X, CalendarDays, CalendarRange } from 'lucide-react'
import { format, parse, isValid } from 'date-fns'
import toast from 'react-hot-toast'
import './DatePicker.css'

interface DatePickerProps {
  selectedDates: string[]
  onDatesChange: (dates: string[]) => void
}

const DatePicker = ({ selectedDates, onDatesChange }: DatePickerProps) => {
  // Picker Type: single or range
  const [pickerType, setPickerType] = useState<'single' | 'range'>('single')

  // For single-date picker
  const [inputDate, setInputDate] = useState('')

  // For range picker
  const [rangeStart, setRangeStart] = useState('')
  const [rangeEnd, setRangeEnd] = useState('')

  const [isAdding, setIsAdding] = useState(false)

  const formatDateToAPI = (date: string): string => {
    const parsed = parse(date, 'yyyy-MM-dd', new Date())
    if (!isValid(parsed)) return ''
    return format(parsed, 'ddMMyyyy')
  }

  const formatDateFromAPI = (apiDate: string): string => {
    if (apiDate.length !== 8) return apiDate
    const day = apiDate.slice(0, 2)
    const month = apiDate.slice(2, 4)
    const year = apiDate.slice(4, 8)
    return `${year}-${month}-${day}`
  }

  // Adding a single date
  const addSingleDate = () => {
    if (!inputDate) {
      toast.error('Please select a date')
      return
    }
    const apiFormat = formatDateToAPI(inputDate)
    if (!apiFormat) {
      toast.error('Invalid date format')
      return
    }
    setIsAdding(true)
    setTimeout(() => {
      onDatesChange([apiFormat])
      setInputDate('')
      setIsAdding(false)
      toast.success('Date added successfully')
    }, 300)
  }

  // Adding a date range
  const addRange = () => {
    if (!rangeStart || !rangeEnd) {
      toast.error('Please select both start and end dates')
      return
    }
    const startAPI = formatDateToAPI(rangeStart)
    const endAPI = formatDateToAPI(rangeEnd)
    if (!startAPI || !endAPI) {
      toast.error('Invalid date format')
      return
    }
    if (rangeStart > rangeEnd) {
      toast.error('Start date should be before end date')
      return
    }
    setIsAdding(true)
    setTimeout(() => {
      onDatesChange([startAPI, endAPI])
      setRangeStart('')
      setRangeEnd('')
      setIsAdding(false)
      toast.success('Date range added successfully')
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
          <Calendar size={24} />
        </div>
        <h2 className="date-picker-title">Date Selection</h2>
      </motion.div>

      <motion.div 
        className="picker-type-section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="picker-type-toggle">
          <label className={`picker-type-option ${pickerType === 'single' ? 'active' : ''}`}>
            <input
              type="radio"
              value="single"
              checked={pickerType === 'single'}
              onChange={() => setPickerType('single')}
            />
            <CalendarDays size={16} />
            <span>Single Date</span>
          </label>
          <label className={`picker-type-option ${pickerType === 'range' ? 'active' : ''}`}>
            <input
              type="radio"
              value="range"
              checked={pickerType === 'range'}
              onChange={() => setPickerType('range')}
            />
            <CalendarRange size={16} />
            <span>Date Range</span>
          </label>
        </div>
      </motion.div>

      <motion.div 
        className="date-input-section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatePresence mode="wait">
          {pickerType === 'single' ? (
            <motion.div
              key="single"
              className="single-date-picker"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="date-input-wrapper">
                <Calendar className="input-icon" size={16} />
                <input
                  type="date"
                  value={inputDate}
                  onChange={e => setInputDate(e.target.value)}
                  className="date-input"
                />
              </div>
              <button
                className="add-date-btn"
                onClick={addSingleDate}
                disabled={isAdding}
              >
                {isAdding ? (
                  <div className="loading-spinner" />
                ) : (
                  <Plus size={16} />
                )}
                <span>Add Date</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="range"
              className="range-date-picker"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="date-input-wrapper">
                <Calendar className="input-icon" size={16} />
                <input
                  type="date"
                  value={rangeStart}
                  onChange={e => setRangeStart(e.target.value)}
                  className="date-input"
                  placeholder="Start Date"
                />
              </div>
              <span className="range-separator">to</span>
              <div className="date-input-wrapper">
                <Calendar className="input-icon" size={16} />
                <input
                  type="date"
                  value={rangeEnd}
                  onChange={e => setRangeEnd(e.target.value)}
                  className="date-input"
                  placeholder="End Date"
                />
              </div>
              <button
                className="add-date-btn"
                onClick={addRange}
                disabled={isAdding}
              >
                {isAdding ? (
                  <div className="loading-spinner" />
                ) : (
                  <CalendarRange size={16} />
                )}
                <span>Add Range</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div 
        className="selected-dates-section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="selected-dates-header">
          <h3 className="section-title">Selected Dates</h3>
          {selectedDates.length > 0 && (
            <button className="clear-all-btn" onClick={clearAllDates}>
              Clear All
            </button>
          )}
        </div>

        <AnimatePresence>
          {selectedDates.length === 0 ? (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Calendar className="empty-icon" size={48} />
              <p>No dates selected</p>
              <span>Add dates to download NSE data</span>
            </motion.div>
          ) : (
            <motion.div
              className="selected-dates-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {pickerType === 'single' && selectedDates.length === 1 && (
                <motion.div
                  key={selectedDates[0]}
                  className="selected-date-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  layout
                >
                  <span className="date-text">{formatDateFromAPI(selectedDates[0])}</span>
                  <button
                    className="remove-date-btn"
                    onClick={() => removeDate(selectedDates[0])}
                  >
                    <X size={12} />
                  </button>
                </motion.div>
              )}
              {pickerType === 'range' && selectedDates.length === 2 && (
                <motion.div
                  className="selected-date-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  layout
                >
                  <span className="date-text">
                    {formatDateFromAPI(selectedDates[0])} → {formatDateFromAPI(selectedDates[1])}
                  </span>
                  <button
                    className="remove-date-btn"
                    onClick={clearAllDates}
                  >
                    <X size={12} />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default DatePicker
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Plus, X, CalendarDays, CalendarRange, Beef } from 'lucide-react'
import './date-picker.css'

interface DatePickerPresenterProps {
    pickerType: 'single' | 'range'
    setPickerType: (type: 'single' | 'range') => void
    inputDate: string
    setInputDate: (date: string) => void
    rangeStart: string
    setRangeStart: (date: string) => void
    rangeEnd: string
    setRangeEnd: (date: string) => void
    isAdding: boolean
    selectedDates: string[]
    formatDateFromAPI: (apiDate: string) => string
    addSingleDate: () => void
    addRange: () => void
    removeDate: (date: string) => void
    clearAllDates: () => void
}

const DatePickerPresenter = ({
    pickerType,
    setPickerType,
    inputDate,
    setInputDate,
    rangeStart,
    setRangeStart,
    rangeEnd,
    setRangeEnd,
    isAdding,
    selectedDates,
    formatDateFromAPI,
    addSingleDate,
    addRange,
    removeDate,
    clearAllDates
}: DatePickerPresenterProps) => {
    const safeSelectedDates = Array.isArray(selectedDates) ? selectedDates : [];
    return (
        <div className="date-picker">
            <motion.div
                className="date-picker-header"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="date-picker-icon">
                    <Beef size={24} />
                </div>
                <h2 className="date-picker-title">Select Dates</h2>
            </motion.div>

            <motion.div
                className="picker-type-section"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <div className="picker-type-toggle">
                    <label
                        className={`picker-type-option ${pickerType === 'single' ? 'active' : ''}`}
                        onClick={() => setPickerType('single')}
                    >
                        <CalendarDays size={16} />
                        Single
                    </label>
                    <label
                        className={`picker-type-option ${pickerType === 'range' ? 'active' : ''}`}
                        onClick={() => setPickerType('range')}
                    >
                        <CalendarRange size={16} />
                        Range
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
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="date-input-wrapper">
                                <Calendar className="input-icon" size={16} />
                                <input
                                    type="date"
                                    value={inputDate}
                                    onChange={e => setInputDate(e.target.value)}
                                    className="date-input"
                                    placeholder="Select Date"
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
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
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
                    {safeSelectedDates.length > 0 && (
                        <button className="clear-all-btn" onClick={clearAllDates}>
                            Clear All
                        </button>
                    )}
                </div>

                <AnimatePresence>
                    {safeSelectedDates.length === 0 ? (
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
                            {safeSelectedDates.map(date => (
                                <motion.div
                                    key={date}
                                    className="selected-date-item"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    layout
                                >
                                    <span className="date-text">{formatDateFromAPI(date)}</span>
                                    <button
                                        className="remove-date-btn"
                                        onClick={() => removeDate(date)}
                                    >
                                        <X size={12} />
                                    </button>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default DatePickerPresenter
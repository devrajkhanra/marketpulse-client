import { motion } from 'framer-motion'
import { BarChart2, Settings, Beef, LayoutDashboard, DownloadCloud } from 'lucide-react'
import './aside.css'
import type { SectionType } from '../../types'
import PerformanceContainer from '../performance/PerformanceContainer';
import DatePickerContainer from '../date-picker/DatePickerContainer';

interface AsidePresenterProps {
    activeSection: SectionType;
    onSectionChange: (section: SectionType) => void;
    selectedDates: string[];
    onDatesChange: (dates: string[]) => void;
}

const AsidePresenter = ({ activeSection, onSectionChange, selectedDates, onDatesChange }: AsidePresenterProps) => {
    return (
        <div className='aside-content'>

            <motion.div
                className='aside-container'
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
                    {activeSection === 'performance' ? (
                        <></>
                    ) : (
                        <>
                            {/* <DownloadContainer selectedDates={selectedDates} onClearDates={() => setSelectedDates([])} /> */}
                            <DatePickerContainer selectedDates={selectedDates} onDatesChange={onDatesChange} />
                        </>
                    )}
                </motion.div>

            </motion.div>
        </div>
    )
}

export default AsidePresenter
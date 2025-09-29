import './volume.css';
import { BarChart, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface VolumeRatio {
    symbol: string;
    difference: number;
}

interface VolumePresenterProps {
    dates: string[];
    onDateChange: (index: number, value: string) => void;
    onSubmit: () => void;
    volumeData?: VolumeRatio[];
    isLoading: boolean;
    error: unknown;
    currentDate?: string;
    lastDownloadDate?: string | null;
}

const VolumePresenter: React.FC<VolumePresenterProps> = ({
    dates,
    onDateChange,
    onSubmit,
    volumeData,
    isLoading,
    error,
    currentDate,
    lastDownloadDate,
}) => {
    return (
        <div className="volume-card">

            <motion.div
                className="volume-header"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="volume-icon">
                    <BarChart size={24} />
                </div>
                <h2 className="volume-title">Volume Ratio</h2>
            </motion.div>

            <div className="info-section">
                <p>Current Date: {currentDate || 'Loading...'}</p>
                <p>Last Downloaded Date: {lastDownloadDate || 'None'}</p>
            </div>

            <motion.div
                className="date-selector"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >

                <div className="date-input-wrapper">
                    <Calendar className="input-icon" size={16} />
                    <input
                        type="date"
                        value={dates[0]}
                        onChange={(e) => onDateChange(0, e.target.value)}
                        className="date-input"
                        placeholder="Select Date"
                    />
                </div>
                <div className="date-input-wrapper">
                    <Calendar className="input-icon" size={16} />
                    <input
                        type="date"
                        value={dates[1]}
                        onChange={(e) => onDateChange(1, e.target.value)}
                        className="date-input"
                        placeholder="Select Date"
                    />
                </div>
            </motion.div>
            <button
                onClick={onSubmit}
                disabled={isLoading || !dates[0] || !dates[1]}
                className="btn"
            >
                {isLoading ? 'Calculating...' : 'Calculate Volume Differences'}
            </button>
            {error ? (
                <p className="error">
                    Error: {error instanceof Error ? error.message : String(error)}
                </p>
            ) : null}
            {volumeData && (
                <div className="results">
                    <table className="compact-table">
                        <thead>
                            <tr>
                                <th>Symbol</th>
                                <th>Volume Difference Ratio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {volumeData.map((item) => (
                                <tr key={item.symbol}>
                                    <td>{item.symbol}</td>
                                    <td>{item.difference}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default VolumePresenter;
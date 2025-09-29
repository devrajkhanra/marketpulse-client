import type { SectionType } from '../../types'
import AsidePresenter from './AsidePresenter';

interface AsideContainerProps {
    activeSection: SectionType;
    onSectionChange: (section: SectionType) => void;
    selectedDates: string[];
    onDatesChange: (dates: string[]) => void;
}

const AsideContainer = ({ activeSection, onSectionChange, selectedDates, onDatesChange }: AsideContainerProps) => {
    return <AsidePresenter activeSection={activeSection} onSectionChange={onSectionChange} selectedDates={selectedDates} onDatesChange={onDatesChange} />;
}

export default AsideContainer
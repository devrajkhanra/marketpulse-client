import SidebarPresenter from './SidebarPresenter'
import type { SectionType } from '../../types'

interface SidebarContainerProps {
    activeSection: SectionType;
    onSectionChange: (section: SectionType) => void;
}

const SidebarContainer = ({ activeSection, onSectionChange }: SidebarContainerProps) => {
    return <SidebarPresenter activeSection={activeSection} onSectionChange={onSectionChange} />;
}

export default SidebarContainer
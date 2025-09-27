// src/features/header/HeaderContainer.tsx
import HeaderPresenter from './HeaderPresenter'
import type { PageType } from '../../types'

interface HeaderContainerProps {
    currentPage: PageType;
    onPageChange: (page: PageType) => void;
}

const HeaderContainer = ({ currentPage, onPageChange }: HeaderContainerProps) => {
    return <HeaderPresenter currentPage={currentPage} onPageChange={onPageChange} />;
}

export default HeaderContainer
export type PageType = 'dashboard' | 'data-download' | 'analytics' | 'settings'

export interface NavigationItem {
  id: PageType
  label: string
  icon: React.ComponentType<{ size?: number }>
  description: string
}
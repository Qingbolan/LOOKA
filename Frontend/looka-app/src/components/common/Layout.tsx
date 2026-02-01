import { ReactNode } from 'react'
import { TabBar } from './TabBar'
import { useSettingsStore } from '@/store'

interface LayoutProps {
  children: ReactNode
  showTabBar?: boolean
  className?: string
}

export function Layout({
  children,
  showTabBar = true,
  className = '',
}: LayoutProps) {
  const { isDarkMode } = useSettingsStore()

  return (
    <div className={`app-shell transition-colors ${isDarkMode ? 'dark' : ''} ${className}`}>
      <div className={`max-w-md mx-auto ${showTabBar ? 'pb-24' : ''}`}>
        {children}
      </div>
      {showTabBar && <TabBar />}
    </div>
  )
}

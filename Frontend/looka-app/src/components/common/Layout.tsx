import { ReactNode } from 'react'
import { TabBar } from './TabBar'

interface LayoutProps {
  children: ReactNode
  showTabBar?: boolean
  dark?: boolean
  className?: string
}

export function Layout({
  children,
  showTabBar = true,
  dark = false,
  className = '',
}: LayoutProps) {
  return (
    <div className={`app-shell transition-colors ${dark ? 'dark' : ''} ${className}`}>
      <div className={`max-w-md mx-auto ${showTabBar ? 'pb-24' : ''}`}>
        {children}
      </div>
      {showTabBar && <TabBar />}
    </div>
  )
}

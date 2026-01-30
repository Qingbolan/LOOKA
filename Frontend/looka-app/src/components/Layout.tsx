import { ReactNode } from 'react'
import { TabBar } from './TabBar'

interface LayoutProps {
  children: ReactNode
  showTabBar?: boolean
}

export function Layout({ children, showTabBar = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className={`max-w-md mx-auto ${showTabBar ? 'pb-24' : ''}`}>
        {children}
      </div>
      {showTabBar && <TabBar />}
    </div>
  )
}

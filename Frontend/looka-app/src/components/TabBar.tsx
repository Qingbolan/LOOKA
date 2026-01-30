import { useLocation, useNavigate } from 'react-router-dom'
import { Icon } from './Icon'

interface TabItem {
  path: string
  icon: string
  label: string
  isCenter?: boolean
}

const tabs: TabItem[] = [
  { path: '/', icon: 'explore', label: '逛逛' },
  { path: '/together', icon: 'favorite', label: '一起' },
  { path: '/luka', icon: 'auto_awesome', label: 'Luka', isCenter: true },
  { path: '/closet', icon: 'checkroom', label: '衣柜' },
  { path: '/profile', icon: 'person', label: '我' },
]

export function TabBar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-black/[0.06] dark:border-white/10 z-50">
      <div className="max-w-md mx-auto px-6 pt-3 pb-[calc(0.5rem+var(--safe-area-inset-bottom))]">
        <div className="flex justify-between items-center">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path

            // 中心按钮 - Luka
            if (tab.isCenter) {
              return (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className="relative -mt-5 flex flex-col items-center"
                >
                  <div className={`
                    w-14 h-14 rounded-full overflow-hidden
                    bg-primary/10
                    shadow-lg shadow-primary/20
                    transition-transform active:scale-95
                    ${isActive ? 'ring-4 ring-primary/20' : ''}
                  `}>
                    <img src="/Luka.png" alt="Luka" className="w-full h-full object-cover" />
                  </div>
                  <span className={`text-[10px] mt-1 ${isActive ? 'text-primary font-bold' : 'text-text-muted dark:text-text-dark-muted font-medium'}`}>
                    {tab.label}
                  </span>
                </button>
              )
            }

            // 普通 tab
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`flex flex-col items-center gap-1.5 transition-colors min-w-[48px] ${
                  isActive ? 'text-primary' : 'text-text-muted dark:text-text-dark-muted'
                }`}
              >
                <Icon
                  name={tab.icon}
                  size={24}
                  filled={isActive}
                />
                <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

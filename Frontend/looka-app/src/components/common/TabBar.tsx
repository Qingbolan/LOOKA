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
  const isLukaActive = location.pathname === '/luka'

  return (
    <>
      {/* 浮动的 Luka 头像 - 独立定位 */}
      <button
        onClick={() => navigate('/luka')}
        className="fixed bottom-[calc(1.5rem+var(--safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-[60]"
      >
        <div className={`
          w-14 h-14 rounded-full p-1.5
          bg-white shadow-md
          transition-transform active:scale-95
          ${isLukaActive ? 'ring-2 ring-primary/30' : ''}
        `}>
          <img src="/Luka.png" alt="Luka" className="w-full h-full object-cover rounded-full" />
        </div>
      </button>

      {/* TabBar 主体 */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-black/[0.06] dark:border-white/10">
        <div className="max-w-md mx-auto px-4 py-1 mb-5 pb-[calc(0.5rem+var(--safe-area-inset-bottom))]">
          <div className="flex justify-between items-center">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.path

              // 中心占位 - 只保留空间给浮动头像
              if (tab.isCenter) {
                return (
                  <div key={tab.path} className="min-w-[48px]" />
                )
              }

              // 普通 tab
              return (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className={`flex items-center flex-col gap-0.5 justify-center transition-colors min-w-[48px] ${
                    isActive ? 'text-primary' : 'text-text-muted dark:text-text-dark-muted'
                  }`}
                >
                  <Icon
                    name={tab.icon}
                    size={26}
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
    </>
  )
}

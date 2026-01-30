import { useLocation, useNavigate } from 'react-router-dom'
import { Icon } from './Icon'

interface TabItem {
  path: string
  icon: string
  label: string
  isCenter?: boolean
}

const tabs: TabItem[] = [
  { path: '/', icon: 'auto_awesome', label: '灵感' },
  { path: '/together', icon: 'favorite', label: '一起' },
  { path: '/create', icon: 'add', label: '', isCenter: true },
  { path: '/closet', icon: 'checkroom', label: '衣柜' },
  { path: '/profile', icon: 'person', label: '我的' },
]

export function TabBar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 z-50">
      <div className="max-w-md mx-auto px-6 pt-3 pb-[calc(0.5rem+var(--safe-area-inset-bottom))]">
        <div className="flex justify-between items-center">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path

            // 中心按钮（生成/许愿）- 特殊样式
            if (tab.isCenter) {
              return (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className="relative -mt-6 flex items-center justify-center"
                >
                  <div className={`
                    w-14 h-14 rounded-full flex items-center justify-center
                    bg-gradient-to-br from-primary via-primary to-pink-400
                    shadow-lg shadow-primary/30
                    transition-transform active:scale-95
                    ${isActive ? 'ring-4 ring-primary/20' : ''}
                  `}>
                    <Icon name="auto_awesome" size={26} className="text-white" />
                  </div>
                </button>
              )
            }

            // 普通 tab
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`flex flex-col items-center gap-1.5 transition-colors min-w-[48px] ${
                  isActive ? 'text-primary' : 'text-gray-400'
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

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
  { path: '/camera', icon: 'photo_camera', label: '拍照', isCenter: true },
  { path: '/closet', icon: 'checkroom', label: '衣柜' },
  { path: '/profile', icon: 'person', label: '我' },
]

export function TabBar() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleCameraClick = () => {
    // 相机功能 - 跳转到 Luka 上传灵感
    navigate('/luka/chat?mode=inspiration')
  }

  return (
    <>
      {/* 浮动的相机按钮 - 独立定位 */}
      <button
        onClick={handleCameraClick}
        className="fixed bottom-[calc(1.5rem+var(--safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-[60]"
      >
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-light shadow-lg flex items-center justify-center transition-transform active:scale-95"
          style={{ boxShadow: '0 4px 20px rgba(196, 146, 138, 0.4)' }}
        >
          <Icon name="photo_camera" size={26} className="text-white" />
        </div>
      </button>

      {/* TabBar 主体 */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-black/[0.06] dark:border-white/10">
        <div className="max-w-md mx-auto px-4 py-1 mb-5 pb-[calc(0.5rem+var(--safe-area-inset-bottom))]">
          <div className="flex justify-between items-center">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.path

              // 中心占位 - 只保留空间给浮动按钮
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

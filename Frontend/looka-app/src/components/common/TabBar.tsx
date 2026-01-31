import { useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Icon } from './Icon'

interface TabItem {
  path: string
  icon: string
  label: string
  isCenter?: boolean
}

interface CameraAction {
  id: string
  icon: string
  title: string
  subtitle: string
  gradient: string
  onClick: () => void
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
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  // 处理从图库选择照片
  const handleGallerySelect = () => {
    setIsActionSheetOpen(false)
    fileInputRef.current?.click()
  }

  // 处理拍照
  const handleCameraCapture = () => {
    setIsActionSheetOpen(false)
    cameraInputRef.current?.click()
  }

  // 处理图片选择后的逻辑
  const handleImageSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // 创建图片URL用于预览
      const imageUrl = URL.createObjectURL(file)
      // 将图片信息存储到 sessionStorage，供 LukaChat 页面读取
      sessionStorage.setItem('inspiration_image', imageUrl)
      sessionStorage.setItem('inspiration_image_name', file.name)
      navigate('/luka/chat?mode=inspiration&hasImage=true')
    }
    // 重置 input 以便可以选择相同文件
    event.target.value = ''
  }

  // 发起许愿成真
  const handleCreateWish = () => {
    setIsActionSheetOpen(false)
    navigate('/design/editor')
  }

  const handleCameraClick = () => {
    setIsActionSheetOpen(true)
  }

  const cameraActions: CameraAction[] = [
    {
      id: 'camera',
      icon: 'photo_camera',
      title: '拍照找灵感',
      subtitle: '用相机捕捉灵感，让 Luka 帮你设计',
      gradient: 'from-primary to-primary-light',
      onClick: handleCameraCapture,
    },
    {
      id: 'gallery',
      icon: 'photo_library',
      title: '从图库选择',
      subtitle: '上传喜欢的图片，获取专属设计',
      gradient: 'from-secondary to-peach',
      onClick: handleGallerySelect,
    },
    {
      id: 'wish',
      icon: 'auto_awesome',
      title: '许愿成真',
      subtitle: '从零开始创作，发起专属愿望',
      gradient: 'from-primary-dark to-primary',
      onClick: handleCreateWish,
    },
  ]

  return (
    <>
      {/* 隐藏的文件输入 - 图库 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelected}
        className="hidden"
      />
      {/* 隐藏的文件输入 - 相机 */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageSelected}
        className="hidden"
      />

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

      {/* ActionSheet - 相机功能选项 */}
      {isActionSheetOpen && (
        <>
          {/* 背景遮罩 */}
          <div
            className="fixed inset-0 bg-black/40 z-[70] animate-fade-in"
            onClick={() => setIsActionSheetOpen(false)}
          />
          {/* 底部面板 - 亚克力效果 */}
          <div
            className="fixed inset-x-0 bottom-0 z-[80] rounded-t-[28px] animate-slide-up"
            style={{
              background: 'rgba(253, 252, 251, 0.92)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              borderTop: '1px solid rgba(255, 255, 255, 0.6)',
              paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            }}
          >
            {/* 拖动指示器 */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-9 h-1 bg-gray-300/60 rounded-full" />
            </div>
            {/* 标题 */}
            <div className="text-center py-3">
              <h3 className="text-[17px] font-semibold text-text-primary tracking-tight">创作灵感</h3>
            </div>
            {/* 选项列表 */}
            <div className="px-4 pb-3 space-y-2">
              {cameraActions.map((action) => (
                <button
                  key={action.id}
                  onClick={action.onClick}
                  className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/60 hover:bg-white/80 active:scale-[0.98] transition-all border border-black/[0.04]"
                  style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}
                >
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center`}
                    style={{ boxShadow: '0 2px 8px rgba(196, 146, 138, 0.25)' }}
                  >
                    <Icon name={action.icon} size={22} className="text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-[15px] text-text-primary">{action.title}</p>
                    <p className="text-[13px] text-text-tertiary mt-0.5">{action.subtitle}</p>
                  </div>
                  <Icon name="chevron_right" size={18} className="text-text-muted" />
                </button>
              ))}
            </div>
            {/* 取消按钮 */}
            <div className="px-4 pb-5 pt-1">
              <button
                onClick={() => setIsActionSheetOpen(false)}
                className="w-full py-3 rounded-xl bg-white/50 text-text-secondary font-medium hover:bg-white/70 active:scale-[0.98] transition-all border border-black/[0.04]"
              >
                取消
              </button>
            </div>
          </div>
        </>
      )}

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

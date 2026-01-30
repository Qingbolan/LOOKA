import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Icon, Button } from '@/components'

export function TryOnPage() {
  const navigate = useNavigate()
  const [sliderPosition, setSliderPosition] = useState(50)
  const [activeView, setActiveView] = useState<'compare' | 'me'>('compare')
  const sliderRef = useRef<HTMLDivElement>(null)

  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return
    handleSliderMove(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleSliderMove(e.touches[0].clientX)
  }

  return (
    <Layout showTabBar={false}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl">
        <div className="flex items-center p-4 h-14 justify-between max-w-md mx-auto">
          <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-start">
            <Icon name="arrow_back_ios" size={20} />
          </button>
          <h1 className="text-[17px] font-bold">看看穿上什么样</h1>
          <button className="size-10 flex items-center justify-end">
            <Icon name="share" size={22} />
          </button>
        </div>
      </div>

      <main className="max-w-md mx-auto pb-36">
        {/* 视图切换 */}
        <div className="flex justify-center py-3">
          <div className="flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setActiveView('compare')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeView === 'compare' ? 'bg-white shadow-sm' : 'text-gray-500'
              }`}
            >
              对比效果
            </button>
            <button
              onClick={() => setActiveView('me')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeView === 'me' ? 'bg-white shadow-sm' : 'text-gray-500'
              }`}
            >
              只看我的
            </button>
          </div>
        </div>

        {/* 对比滑块 */}
        {activeView === 'compare' ? (
          <div
            ref={sliderRef}
            className="relative aspect-[3/4] overflow-hidden cursor-ew-resize"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* 右侧：我的效果 */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800)' }}
            >
              <div className="absolute bottom-6 right-6 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full">
                <span className="text-xs font-medium">穿在我身上</span>
              </div>
            </div>

            {/* 左侧：设计图 */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800)',
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              }}
            >
              <div className="absolute bottom-6 left-6 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full">
                <span className="text-xs font-medium">设计效果</span>
              </div>
            </div>

            {/* 滑块手柄 */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                <Icon name="drag_indicator" size={20} className="text-gray-400" />
              </div>
            </div>

            {/* 提示 */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full">
              <span className="text-white text-xs">← 滑动对比 →</span>
            </div>
          </div>
        ) : (
          /* 只看我的效果 */
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800"
              alt="我的试穿效果"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* 衣服信息 */}
        <div className="p-4">
          <h2 className="text-lg font-bold">星空渐变长裙</h2>
          <p className="text-sm text-gray-500 mt-1">"想要一条像银河一样的裙子"</p>

          {/* 简单的版型信息 */}
          <div className="flex gap-3 mt-4">
            <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-400 mb-1">版型</p>
              <p className="text-sm font-medium">宽松</p>
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-400 mb-1">长度</p>
              <p className="text-sm font-medium">及膝</p>
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-400 mb-1">面料</p>
              <p className="text-sm font-medium">轻薄</p>
            </div>
          </div>

          {/* Luka 的话 */}
          <div className="mt-4 p-4 bg-gradient-to-r from-primary/5 to-pink-50 rounded-2xl">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-pink-400 flex items-center justify-center flex-shrink-0">
                <Icon name="auto_awesome" size={14} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Luka 觉得</p>
                <p className="text-sm text-gray-700">这件裙子很适合你，宽松的版型刚好修饰腰线。建议搭配浅色系上衣会更好看~</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 底部操作 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto">
        <div className="px-4 py-4 bg-white/95 backdrop-blur-2xl border-t border-gray-100">
          <div className="flex gap-3" style={{ paddingBottom: 'var(--safe-area-inset-bottom)' }}>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/closet')}
            >
              <Icon name="checkroom" size={18} />
              存到衣柜
            </Button>
            <Button
              variant="primary"
              fullWidth
              size="lg"
              onClick={() => navigate('/group-buy/1')}
            >
              我想要这件
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

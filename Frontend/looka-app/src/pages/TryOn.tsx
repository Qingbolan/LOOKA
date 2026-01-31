import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Icon, LukaAvatar } from '@/components'

export function TryOnPage() {
  const navigate = useNavigate()
  const [sliderPosition, setSliderPosition] = useState(50)
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
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="flex items-center p-4 h-14 justify-between max-w-md mx-auto">
          <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-start">
            <Icon name="arrow_back_ios" size={20} className="text-gray-600" />
          </button>
          <h1 className="text-[17px] font-bold">AI 试穿</h1>
          <button className="size-10 flex items-center justify-end">
            <Icon name="share" size={22} className="text-gray-600" />
          </button>
        </div>
      </div>

      <main className="max-w-md mx-auto pb-32">
        {/* 对比滑块 */}
        <div className="px-4 pt-2">
          <div
            ref={sliderRef}
            className="relative aspect-[3/4] rounded overflow-hidden cursor-ew-resize bg-gray-100"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* 右侧：试穿效果 */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800)' }}
            />

            {/* 左侧：原图（没穿这件衣服） */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800)',
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              }}
            />

            {/* 滑块手柄 */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                <Icon name="drag_indicator" size={20} className="text-gray-400" />
              </div>
            </div>

            {/* 左侧标签 */}
            <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full">
              <span className="text-white text-xs font-medium">原图</span>
            </div>

            {/* 右侧标签 */}
            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-primary/90 backdrop-blur-sm rounded-full">
              <span className="text-white text-xs font-medium">试穿效果</span>
            </div>

            {/* 顶部提示 */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full">
              <span className="text-white text-xs">← 左右滑动对比 →</span>
            </div>

            {/* 左下角：衣服缩略图 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-14 rounded overflow-hidden border-2 border-white shadow-lg bg-white">
              <img
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=200"
                alt="衣服"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 衣服信息 */}
        <div className="px-4 pt-4">
          <h2 className="text-xl font-bold">星空渐变长裙</h2>
          <p className="text-sm text-gray-500 mt-1">"想要一条像银河一样的裙子"</p>

          {/* 版型信息 */}
          <div className="flex gap-2 mt-3 flex-wrap">
            <span className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600">宽松版型</span>
            <span className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600">及膝长度</span>
            <span className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600">轻薄雪纺</span>
          </div>
        </div>

        {/* Luka 的建议 */}
        <div className="px-4 mt-4">
          <div className="bg-primary/5 rounded p-4 border border-primary/10">
            <div className="flex items-start gap-3">
              <LukaAvatar size="sm" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Luka 觉得</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  这件裙子很适合你！宽松的版型刚好修饰腰线，颜色也很衬你的肤色~
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 底部操作 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl border-t border-gray-100 max-w-md mx-auto z-50">
        <div className="flex gap-3" style={{ paddingBottom: 'var(--safe-area-inset-bottom)' }}>
          <button
            onClick={() => navigate(-1)}
            className="h-12 px-5 bg-gray-100 text-gray-700 font-medium rounded flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <Icon name="arrow_back" size={20} />
            返回
          </button>
          <button
            onClick={() => navigate('/group-buy/1')}
            className="flex-1 h-12 bg-primary text-white font-bold rounded shadow-md shadow-primary/25 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <Icon name="favorite" size={18} filled />
            我想要这件
          </button>
        </div>
      </div>
    </Layout>
  )
}

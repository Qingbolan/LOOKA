import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Icon, Button, Card } from '@/components'

const makeupStyles = [
  { id: 'natural', name: '素颜', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
  { id: 'cool', name: '清冷感', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
  { id: 'mature', name: '御姐风', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
  { id: 'trendy', name: '潮流妆', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
  { id: 'sunset', name: '落日妆', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
]

export function TryOnPage() {
  const navigate = useNavigate()
  const [sliderPosition, setSliderPosition] = useState(50)
  const [activeMakeup, setActiveMakeup] = useState('natural')
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
            <Icon name="arrow_back_ios" size={20} className="text-gray-900" />
          </button>
          <h1 className="text-[17px] font-bold tracking-tight flex-1 text-center">试穿及试妆预览</h1>
          <button className="size-10 flex items-center justify-end">
            <Icon name="share" size={22} />
          </button>
        </div>
      </div>

      <main className="max-w-md mx-auto p-4 pb-36">
        {/* Comparison Slider */}
        <div
          ref={sliderRef}
          className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-xl cursor-ew-resize mb-6"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* Right Image (My Try-on) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800)' }}
          >
            <div className="absolute bottom-6 right-6 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/20">
              <span className="text-white text-xs font-bold">我的试穿</span>
            </div>
          </div>

          {/* Left Image (Model) - Clipped */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800)',
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            }}
          >
            <div className="absolute bottom-6 left-6 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/20">
              <span className="text-white text-xs font-bold">模特展示</span>
            </div>
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
              <Icon name="unfold_more" size={20} className="text-primary font-bold rotate-90" />
            </div>
          </div>
        </div>

        {/* AI Makeup Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1">
              <Icon name="face" size={18} className="text-primary" filled />
              AI 试妆
            </h3>
            <span className="text-[10px] text-primary font-bold px-2 py-0.5 bg-primary/10 rounded-full">
              REALISTIC AI
            </span>
          </div>
          <div className="flex overflow-x-auto gap-4 py-2 hide-scrollbar">
            {makeupStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setActiveMakeup(style.id)}
                className="flex flex-col items-center gap-2 flex-shrink-0"
              >
                <div className={`size-14 rounded-full p-0.5 transition-all ${
                  activeMakeup === style.id
                    ? 'ring-2 ring-primary ring-offset-2'
                    : ''
                }`}>
                  <div
                    className="w-full h-full rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${style.image})` }}
                  />
                </div>
                <span className={`text-[11px] transition-colors ${
                  activeMakeup === style.id ? 'font-bold text-primary' : 'font-medium text-gray-500'
                }`}>
                  {style.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Card */}
        <Card>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-bold mb-1">法式复古针织连衣裙</h2>
              <p className="text-gray-400 text-sm">2024 春夏系列 · 羊毛混纺</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary">¥1,899</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 rounded-2xl p-3 border border-green-100">
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">合身度</p>
              <p className="text-lg font-bold text-green-600">96.5%</p>
            </div>
            <div className="bg-primary/5 rounded-2xl p-3 border border-primary/10">
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">建议尺码</p>
              <p className="text-lg font-bold text-primary">S (完美)</p>
            </div>
          </div>
        </Card>

        {/* Share CTA */}
        <Card className="mt-4 bg-luxury-black text-white overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="font-bold text-lg mb-2">分享您的试穿成果</h3>
            <p className="text-white/60 text-sm mb-4 leading-relaxed">
              发布到社区，与 10w+ 穿搭达人共同探讨美学心得。
            </p>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-primary py-3 rounded-full font-bold text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            >
              <Icon name="share" size={18} />
              分享到社区
            </button>
          </div>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        </Card>
      </main>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto">
        <div className="px-4 py-4 bg-white/95 backdrop-blur-2xl border-t border-gray-100">
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="lg"
              icon="bookmark"
              onClick={() => navigate('/closet')}
            >
              保存
            </Button>
            <Button
              variant="primary"
              fullWidth
              size="lg"
              icon="shopping_bag"
              onClick={() => navigate('/product/1')}
            >
              立即下单
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

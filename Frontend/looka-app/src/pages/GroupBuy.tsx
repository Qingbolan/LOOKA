import { useNavigate } from 'react-router-dom'
import { Layout, Icon, Card, ImageSwap } from '@/components'

// 也想要这件的人
const dreamers = [
  { id: '1', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', name: '小美', time: '2小时前', message: '一直在找这种感觉的裙子！' },
  { id: '2', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', name: 'Luna', time: '3小时前', message: '颜色太美了' },
  { id: '3', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', name: '穿搭日记', time: '5小时前', message: null },
  { id: '4', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', name: '设计师小王', time: '6小时前', message: '这个版型绝了' },
  { id: '5', avatar: null, name: '匿名', time: '8小时前', message: null },
]

export function GroupBuyPage() {
  const navigate = useNavigate()
  const currentDreamers = 8
  const targetDreamers = 10
  const daysLeft = 3

  return (
    <Layout showTabBar={false}>
      {/* Header - 简洁，用设计名称 */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="flex items-center p-4 h-16 justify-between max-w-md mx-auto" style={{ paddingTop: 'calc(var(--safe-area-inset-top) + 1rem)' }}>
          <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-start">
            <Icon name="arrow_back_ios" size={20} className="text-gray-900" />
          </button>
          <h1 className="text-[17px] font-bold tracking-tight flex-1 text-center font-display">星空渐变连衣裙</h1>
          <button className="size-10 flex items-center justify-end">
            <Icon name="share" size={24} />
          </button>
        </div>
      </div>

      <div className="pb-36">
        {/* 主图 - 模特试穿效果 + 左下角衣服缩略图 */}
        <div className="px-4 pt-2">
          <div className="aspect-[4/5] relative rounded-lg overflow-hidden">
            <ImageSwap
              mainImage="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800"
              thumbImage="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=200"
              alt="星空渐变连衣裙"
              className="w-full h-full"
              thumbSize="lg"
            />
            {/* 右下角：想要人数 */}
            <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 z-10">
              <Icon name="favorite" size={14} className="text-primary" filled />
              <span className="text-white text-xs font-medium">23</span>
            </div>
          </div>
        </div>

        {/* 设计信息 */}
        <div className="px-4 pt-3">
          <h2 className="text-xl font-bold">星空渐变连衣裙</h2>
          <p className="text-sm text-gray-500 mt-1">"想要一条像银河一样的裙子"</p>
          <div className="flex items-center gap-2 mt-2">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
              alt=""
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm text-gray-600">小美 的愿望</span>
          </div>
        </div>

        {/* 愿望状态 - 核心信息，但不是促销感 */}
        <div className="p-4">
          <Card className="bg-primary/5 border-primary/10">
            <div className="text-center mb-4">
              <p className="text-gray-500 text-sm">这个愿望</p>
              <p className="text-2xl font-bold mt-1">
                还差 <span className="text-primary">{targetDreamers - currentDreamers}</span> 个人
              </p>
              <p className="text-gray-500 text-sm">就能一起拥有它了</p>
            </div>

            {/* 进度 - 用更柔和的方式展示 */}
            <div className="relative">
              <div className="flex justify-between mb-2">
                {[...Array(targetDreamers)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
                      ${i < currentDreamers
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-300'
                      }`}
                  >
                    {i < currentDreamers ? (
                      <Icon name="favorite" size={12} filled />
                    ) : (
                      <Icon name="favorite_border" size={12} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
              <Icon name="schedule" size={16} />
              <span>还有 {daysLeft} 天</span>
            </div>
          </Card>
        </div>

        {/* 也想要的人 */}
        <div className="px-4">
          <Card>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Icon name="favorite" size={20} className="text-primary" />
              也想要这件的人
            </h3>
            <div className="space-y-4">
              {dreamers.map((dreamer) => (
                <div key={dreamer.id} className="flex items-start gap-3">
                  {dreamer.avatar ? (
                    <img
                      src={dreamer.avatar}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <Icon name="person" size={20} className="text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{dreamer.name}</p>
                      <span className="text-xs text-gray-400">{dreamer.time}</span>
                    </div>
                    {dreamer.message && (
                      <p className="text-sm text-gray-500 mt-0.5">"{dreamer.message}"</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* 它会怎样来到你身边 */}
        <div className="px-4 mt-4">
          <Card>
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Icon name="local_shipping" size={20} className="text-primary" />
              它会怎样来到你身边
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="font-medium text-sm">人齐了，开始制作</p>
                  <p className="text-xs text-gray-500 mt-0.5">Luka 会通知你</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="font-medium text-sm">专属工坊手工制作</p>
                  <p className="text-xs text-gray-500 mt-0.5">大约需要 5-7 天</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-sm">3</span>
                </div>
                <div>
                  <p className="font-medium text-sm">你的 Dream Dress 出发</p>
                  <p className="text-xs text-gray-500 mt-0.5">直接送到你手上</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center">
                如果人数不够，会全额退回，放心许愿
              </p>
            </div>
          </Card>
        </div>

        {/* 设计详情 */}
        <div className="px-4 mt-4">
          <Card>
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Icon name="style" size={20} className="text-primary" />
              关于这件裙子
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-400">风格</span>
                <span>梦幻 · 日常可穿</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-400">面料</span>
                <span>轻薄雪纺</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-400">长度</span>
                <span>及膝</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-400">配色</span>
                <div className="flex gap-1">
                  <div className="w-4 h-4 rounded-full bg-indigo-900" />
                  <div className="w-4 h-4 rounded-full bg-purple-600" />
                  <div className="w-4 h-4 rounded-full bg-pink-400" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 底部 - 试穿 + 许愿按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl border-t border-gray-100 max-w-md mx-auto z-50">
        <div style={{ paddingBottom: 'var(--safe-area-inset-bottom)' }}>
          <div className="flex items-center gap-3">
            {/* 试穿按钮 */}
            <button
              onClick={() => navigate('/try-on')}
              className="h-12 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            >
              <Icon name="person" size={20} />
              试穿
            </button>
            {/* 我也想要按钮 */}
            <button className="flex-1 h-12 bg-primary text-white text-[15px] font-bold rounded-xl shadow-md shadow-primary/25 active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
              <Icon name="favorite" size={18} filled />
              我也想要
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">
            人齐了才开始，放心许愿
          </p>
        </div>
      </div>
    </Layout>
  )
}

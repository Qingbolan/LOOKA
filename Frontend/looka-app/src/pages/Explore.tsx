import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Icon, CardMasonry, Badge } from '@/components'

// 主导航
const mainTabs = ['关注', '最近', '热门']

// 风格标签
const styles = ['全部', '梦幻', '简约', '复古', '街头', '优雅', '甜酷']

// 别人的 dream dress 设计
const dreams = [
  {
    id: '1',
    modelImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400',
    clothImage: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=200',
    name: '星空渐变长裙',
    description: '像银河一样的颜色',
    dreamer: { name: '小美', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    wantCount: 23,
    isWanted: false,
    status: 'collecting',
  },
  {
    id: '2',
    modelImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
    clothImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200',
    name: '真丝和服外套',
    description: '日式复古，轻薄透气',
    dreamer: { name: 'Luna', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    wantCount: 156,
    isWanted: true,
    status: 'making',
  },
  {
    id: '3',
    modelImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400',
    clothImage: 'https://images.unsplash.com/photo-1485968579169-a6b12a6e05ff?w=200',
    name: '极简白衬衫',
    description: '完美版型，高级面料',
    dreamer: { name: '设计师阿白', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
    wantCount: 89,
    isWanted: false,
    status: 'collecting',
  },
  {
    id: '4',
    modelImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
    clothImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200',
    name: 'oversized 西装',
    description: '英伦复古格纹',
    dreamer: { name: '职场穿搭', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
    wantCount: 67,
    isWanted: false,
    status: 'done',
  },
]

const statusConfig: Record<string, { text: string; variant: 'wishing' | 'making' | 'owned' }> = {
  collecting: { text: '等人一起', variant: 'wishing' },
  making: { text: '制作中', variant: 'making' },
  done: { text: '已实现', variant: 'owned' },
}

export function ExplorePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(1) // 默认选中"最近"
  const [activeStyle, setActiveStyle] = useState(0)

  return (
    <Layout>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="flex flex-col max-w-md mx-auto">
          {/* 标题行 + 主导航 */}
          <div className="flex items-center px-4 h-12 justify-between">
            <h1 className="text-lg font-bold">灵感</h1>
            <div className="flex items-center gap-4">
              {mainTabs.map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(index)}
                  className={`text-[15px] ${
                    index === activeTab
                      ? 'font-bold text-gray-900'
                      : 'text-gray-400'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button className="size-8 flex items-center justify-center">
              <Icon name="search" size={22} className="text-gray-600" />
            </button>
          </div>

          {/* 风格标签 */}
          <div className="flex overflow-x-auto px-4 pb-2.5 gap-2 hide-scrollbar">
            {styles.map((style, index) => (
              <button
                key={style}
                onClick={() => setActiveStyle(index)}
                className={`whitespace-nowrap px-3 py-1 rounded-full text-[12px] transition-all ${
                  index === activeStyle
                    ? 'bg-primary text-white font-medium'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 设计卡片 */}
      <main className="max-w-md mx-auto px-2 pb-32">
        <CardMasonry
          columns={{ default: 2, sm: 2, md: 2, lg: 2 }}
          gap={6}
        >
          {dreams.map((dream) => (
            <div
              key={dream.id}
              onClick={() => navigate(`/group-buy/${dream.id}`)}
              className="bg-white rounded-lg overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
            >
              {/* 图片区域 */}
              <div className="relative aspect-[3/4] bg-gray-100">
                {/* 主图：模特穿着效果 */}
                <img
                  src={dream.modelImage}
                  alt={dream.name}
                  className="w-full h-full object-cover"
                />
                {/* 左下角：衣服缩略图 */}
                <div className="absolute bottom-2 left-2 w-9 h-11 rounded overflow-hidden border-2 border-white shadow-md bg-white">
                  <img
                    src={dream.clothImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* 状态标签 */}
                <div className="absolute top-1.5 left-1.5">
                  <Badge variant={statusConfig[dream.status].variant} size="sm">
                    {statusConfig[dream.status].text}
                  </Badge>
                </div>
              </div>
              {/* 信息区域 */}
              <div className="px-1.5 py-2">
                <h3 className="text-[13px] font-semibold leading-tight line-clamp-2">{dream.name}</h3>
                <div className="flex items-center justify-between mt-1.5">
                  <div className="flex items-center gap-1 min-w-0">
                    <img
                      src={dream.dreamer.avatar}
                      alt={dream.dreamer.name}
                      className="w-4 h-4 rounded-full object-cover flex-shrink-0"
                    />
                    <span className="text-[11px] text-gray-500 truncate">{dream.dreamer.name}</span>
                  </div>
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    <Icon name="favorite" size={12} className="text-gray-400" filled={dream.isWanted} />
                    <span className="text-[11px] text-gray-400">{dream.wantCount}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardMasonry>

        {/* 底部提示 */}
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm">看到喜欢的？点击"我也想要"</p>
          <p className="text-gray-400 text-sm">或者告诉 Luka 你的想法</p>
        </div>
      </main>
    </Layout>
  )
}

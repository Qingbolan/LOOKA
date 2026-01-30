import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Icon, CardMasonry } from '@/components'

// 风格标签
const styles = ['全部', '梦幻', '简约', '复古', '街头', '优雅', '甜酷']

// 别人的 dream dress 设计
const dreams = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400',
    name: '星空渐变长裙',
    description: '像银河一样的颜色',
    dreamer: { name: '小美', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    wantCount: 23,
    isWanted: false,
    status: 'collecting', // collecting | making | done
    aspectRatio: '3/4',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400',
    name: '真丝和服外套',
    description: '日式复古，轻薄透气',
    dreamer: { name: 'Luna', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    wantCount: 156,
    isWanted: true,
    status: 'making',
    aspectRatio: '3/5',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400',
    name: '极简白衬衫',
    description: '完美版型，高级面料',
    dreamer: { name: '设计师阿白', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
    wantCount: 89,
    isWanted: false,
    status: 'collecting',
    aspectRatio: '4/5',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
    name: 'oversized 西装',
    description: '英伦复古格纹',
    dreamer: { name: '职场穿搭', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
    wantCount: 67,
    isWanted: false,
    status: 'done',
    aspectRatio: '1/1',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
    name: '法式碎花裙',
    description: '春日氛围感',
    dreamer: { name: 'Mina', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
    wantCount: 234,
    isWanted: false,
    status: 'collecting',
    aspectRatio: '3/4',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1485968579169-a6b12a6e05ff?w=400',
    name: '针织开衫',
    description: '奶油色，慵懒感',
    dreamer: { name: '穿搭日记', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
    wantCount: 45,
    isWanted: false,
    status: 'collecting',
    aspectRatio: '4/5',
  },
]

const statusLabels: Record<string, { text: string; color: string }> = {
  collecting: { text: '等人一起', color: 'bg-primary/10 text-primary' },
  making: { text: '制作中', color: 'bg-green-50 text-green-600' },
  done: { text: '已实现', color: 'bg-gray-100 text-gray-500' },
}

export function ExplorePage() {
  const navigate = useNavigate()
  const [activeStyle, setActiveStyle] = useState(0)

  return (
    <Layout>
      {/* Header - 简洁 */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="flex flex-col max-w-md mx-auto">
          <div className="flex items-center p-4 h-16 justify-between">
            <h1 className="text-xl font-bold">灵感</h1>
            <button className="size-10 flex items-center justify-center">
              <Icon name="search" size={24} />
            </button>
          </div>

          {/* 风格标签 */}
          <div className="flex overflow-x-auto px-4 pb-3 gap-3 hide-scrollbar">
            {styles.map((style, index) => (
              <button
                key={style}
                onClick={() => setActiveStyle(index)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] transition-all ${
                  index === activeStyle
                    ? 'bg-luxury-black text-white font-bold'
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
      <main className="max-w-md mx-auto p-3 pb-32">
        <CardMasonry
          columns={{ default: 2, sm: 2, md: 2, lg: 2 }}
          gap={12}
          animate
        >
          {dreams.map((dream) => (
            <div
              key={dream.id}
              onClick={() => navigate(`/group-buy/${dream.id}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div className="relative bg-gray-100" style={{ aspectRatio: dream.aspectRatio }}>
                <img
                  src={dream.image}
                  alt={dream.name}
                  className="w-full h-full object-cover"
                />
                {/* 状态标签 */}
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-[10px] font-medium ${statusLabels[dream.status].color}`}>
                  {statusLabels[dream.status].text}
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-[15px] font-bold leading-snug">{dream.name}</h3>
                <p className="text-[12px] text-gray-500 mt-0.5 line-clamp-1">{dream.description}</p>

                <div className="flex items-center justify-between mt-3">
                  {/* 许愿者 */}
                  <div className="flex items-center gap-1.5">
                    <img
                      src={dream.dreamer.avatar}
                      alt={dream.dreamer.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="text-[11px] text-gray-500">{dream.dreamer.name}</span>
                  </div>
                  {/* 想要的人数 */}
                  <div className="flex items-center gap-1">
                    <Icon
                      name="favorite"
                      size={14}
                      filled={dream.isWanted}
                      className={dream.isWanted ? 'text-primary' : 'text-gray-300'}
                    />
                    <span className={`text-[11px] ${dream.isWanted ? 'text-primary font-medium' : 'text-gray-400'}`}>
                      {dream.wantCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardMasonry>

        {/* 底部提示 */}
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm">看到喜欢的？点击"我也想要"</p>
          <p className="text-gray-400 text-sm">或者告诉 Luka 你的想法 ✨</p>
        </div>
      </main>
    </Layout>
  )
}

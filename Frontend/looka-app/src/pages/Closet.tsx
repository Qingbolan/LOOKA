import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Icon, LukaAvatar } from '@/components'

// 分类
const categories = ['全部', '上装', '下装', '裙装', '外套', '配饰']

// 我的衣服
const myClothes = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400',
    name: '星空渐变长裙',
    category: '裙装',
    season: ['春', '秋'],
    status: 'wanting',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400',
    name: '真丝和服外套',
    category: '外套',
    season: ['春', '夏'],
    status: 'making',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400',
    name: '极简白衬衫',
    category: '上装',
    season: ['春', '夏', '秋'],
    status: 'owned',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1485968579169-a6b12a6e05ff?w=400',
    name: '法式碎花裙',
    category: '裙装',
    season: ['春', '夏'],
    status: 'owned',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
    name: '复古格纹西装',
    category: '外套',
    season: ['秋', '冬'],
    status: 'owned',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
    name: '高腰阔腿裤',
    category: '下装',
    season: ['春', '秋'],
    status: 'shipping',
  },
]

// 今日推荐搭配
const todayOutfit = {
  greeting: '今天有点冷，推荐这样穿',
  items: [
    { id: '5', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400', name: '复古格纹西装' },
    { id: '3', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400', name: '极简白衬衫' },
  ],
}

const statusIcons: Record<string, { icon: string; color: string }> = {
  wanting: { icon: 'favorite', color: 'bg-primary' },
  making: { icon: 'hourglass_top', color: 'bg-amber-500' },
  shipping: { icon: 'local_shipping', color: 'bg-sky-500' },
}

export function ClosetPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState(0)

  const filteredClothes = activeCategory === 0
    ? myClothes
    : myClothes.filter(c => c.category === categories[activeCategory])

  return (
    <Layout>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl">
        <div className="flex items-center p-4 h-14 justify-between max-w-md mx-auto">
          <h1 className="text-xl font-bold">我的衣柜</h1>
          <button className="size-10 flex items-center justify-center">
            <Icon name="search" size={24} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto pb-32">
        {/* Luka 今日推荐 */}
        <div className="px-4 mb-4">
          <div className="bg-gradient-to-r from-primary/5 via-pink-50 to-primary/5 rounded-2xl p-4 border border-primary/10">
            <div className="flex items-center gap-2 mb-3">
              <LukaAvatar size="sm" />
              <div>
                <p className="text-xs text-gray-500">Luka 说</p>
                <p className="text-sm font-medium">{todayOutfit.greeting}</p>
              </div>
            </div>
            <div className="flex gap-3">
              {todayOutfit.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/closet/${item.id}`)}
                  className="flex-1 cursor-pointer"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-white mb-1">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs text-gray-600 truncate">{item.name}</p>
                </div>
              ))}
              <div className="flex-1 aspect-square rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center bg-white/50">
                <div className="text-center">
                  <Icon name="add" size={20} className="text-gray-300 mx-auto" />
                  <p className="text-[10px] text-gray-400 mt-1">添加</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 分类标签 */}
        <div className="px-4 mb-3">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {categories.map((cat, index) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(index)}
                className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                  index === activeCategory
                    ? 'bg-gradient-to-r from-primary to-pink-500 text-white font-medium'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 衣服网格 */}
        <div className="grid grid-cols-3 gap-0.5">
          {filteredClothes.map((cloth) => (
            <div
              key={cloth.id}
              onClick={() => navigate(`/closet/${cloth.id}`)}
              className="relative aspect-[3/4] cursor-pointer group bg-gray-100"
            >
              <img
                src={cloth.image}
                alt={cloth.name}
                className="w-full h-full object-cover"
              />

              {/* 状态角标 */}
              {cloth.status !== 'owned' && statusIcons[cloth.status] && (
                <div className={`absolute top-2 left-2 w-5 h-5 ${statusIcons[cloth.status].color} rounded-full flex items-center justify-center`}>
                  <Icon name={statusIcons[cloth.status].icon} size={cloth.status === 'shipping' ? 10 : 12} className="text-white" filled={cloth.status === 'wanting'} />
                </div>
              )}

              {/* 季节标签 */}
              <div className="absolute bottom-2 right-2 flex gap-0.5">
                {cloth.season.slice(0, 2).map((s) => (
                  <span key={s} className="text-[8px] bg-white/80 backdrop-blur-sm px-1 rounded text-gray-600">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* 添加新衣服 */}
          <div
            onClick={() => navigate('/create')}
            className="aspect-[3/4] bg-gray-50 flex flex-col items-center justify-center cursor-pointer"
          >
            <Icon name="add" size={32} className="text-gray-300 mb-1" />
            <p className="text-[10px] text-gray-400">添加</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

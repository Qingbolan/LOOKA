import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Icon, LukaAvatar, CardMasonry, ImageSwap } from '@/components'

// 主 Tab
const mainTabs = ['穿搭', '衣帽间', '灵感', '心愿单']

// 衣服分类
const categories = ['全部', '上装', '下装', '裙装', '外套', '配饰']

// 我的穿搭
const myOutfits = [
  {
    id: 'outfit-1',
    name: '通勤优雅',
    items: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400',
    ],
    occasion: '上班',
  },
  {
    id: 'outfit-2',
    name: '周末休闲',
    items: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
      'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400',
    ],
    occasion: '约会',
  },
]

// 我的衣服（衣帽间）
const myClothes = [
  {
    id: '1',
    modelImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400',
    clothImage: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=200',
    name: '星空渐变长裙',
    category: '裙装',
    status: 'making',
  },
  {
    id: '2',
    modelImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
    clothImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200',
    name: '真丝和服外套',
    category: '外套',
    status: 'shipping',
  },
  {
    id: '3',
    modelImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400',
    clothImage: 'https://images.unsplash.com/photo-1485968579169-a6b12a6e05ff?w=200',
    name: '极简白衬衫',
    category: '上装',
    status: 'owned',
  },
  {
    id: '5',
    modelImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
    clothImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200',
    name: '复古格纹西装',
    category: '外套',
    status: 'owned',
  },
]

// 灵感（记录想法）
const myInspirations = [
  {
    id: 'i1',
    text: '想要一条能在海边穿的飘逸长裙，最好是白色或浅蓝色',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
    tags: ['度假', '飘逸', '长裙'],
    time: '3天前',
    status: 'new',
  },
  {
    id: 'i2',
    text: '看到一个博主穿的针织开衫很好看，想要类似的，但要更修身一点',
    image: null,
    tags: ['针织', '开衫', '修身'],
    time: '1周前',
    status: 'new',
  },
  {
    id: 'i3',
    text: '需要一件能配所有裤子的基础款白T，领口不要太大',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300',
    tags: ['基础款', '白T', '百搭'],
    time: '2周前',
    status: 'realized', // 已变成愿望
  },
]

// 收藏
const myCollections = [
  {
    id: 'c1',
    modelImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400',
    clothImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200',
    name: '海边度假白裙',
    from: '小红书',
  },
  {
    id: 'c2',
    modelImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
    clothImage: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=200',
    name: '街头风牛仔外套',
    from: '街拍',
  },
  {
    id: 'c3',
    modelImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400',
    clothImage: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=200',
    name: '气质渐变长裙',
    from: '淘宝',
  },
  {
    id: 'c4',
    modelImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
    clothImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200',
    name: '英伦复古西装',
    from: 'B站',
  },
  {
    id: 'c5',
    modelImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400',
    clothImage: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=200',
    name: '极简白衬衫',
    from: '微信',
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

const statusConfig: Record<string, { text: string; color: string }> = {
  making: { text: '制作中', color: 'bg-amber-500' },
  shipping: { text: '快递中', color: 'bg-sky-500' },
  owned: { text: '', color: '' },
}

export function ClosetPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(1) // 默认衣帽间
  const [activeCategory, setActiveCategory] = useState(0)

  const filteredClothes = activeCategory === 0
    ? myClothes
    : myClothes.filter(c => c.category === categories[activeCategory])

  return (
    <Layout>
      {/* Header */}
      <div className="header-main">
        <div className="header-main-inner">
          <h1 className="header-title">衣柜</h1>
          <div className="tabs-header">
            {mainTabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={`tab-header ${
                  index === activeTab ? 'tab-header-active' : 'tab-header-inactive'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="header-btn">
            <Icon name="search" size={22} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="content-masonry">
        {/* Tab 0: 穿搭 */}
        {activeTab === 0 && (
          <>
            {/* Luka 今日推荐 */}
            <div className="mb-4">
              <div className="bg-primary/5 rounded p-3 border border-primary/10">
                <div className="flex items-center gap-2 mb-3">
                  <LukaAvatar size="sm" />
                  <div>
                    <p className="text-xs text-gray-500">Luka 说</p>
                    <p className="text-sm font-medium">{todayOutfit.greeting}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  {todayOutfit.items.map((item) => (
                    <div key={item.id} className="flex-1">
                      <div className="aspect-square rounded overflow-hidden bg-white mb-1">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-xs text-gray-600 truncate">{item.name}</p>
                    </div>
                  ))}
                  <div className="flex-1 aspect-square rounded border-2 border-dashed border-gray-200 flex items-center justify-center bg-white/50">
                    <div className="text-center">
                      <Icon name="add" size={20} className="text-gray-300 mx-auto" />
                      <p className="text-[10px] text-gray-400 mt-1">添加</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 我的穿搭 */}
            <div className="space-y-3">
              {myOutfits.map((outfit) => (
                <div key={outfit.id} className="bg-white rounded p-3 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">{outfit.name}</h3>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{outfit.occasion}</span>
                  </div>
                  <div className="flex gap-2">
                    {outfit.items.map((img, i) => (
                      <div key={i} className="w-16 h-20 rounded overflow-hidden bg-gray-100">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="w-16 h-20 rounded border-2 border-dashed border-gray-200 flex items-center justify-center">
                      <Icon name="add" size={18} className="text-gray-300" />
                    </div>
                  </div>
                </div>
              ))}

              {/* 新建穿搭 */}
              <div
                onClick={() => navigate('/luka')}
                className="bg-gray-50 rounded p-6 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer"
              >
                <Icon name="add" size={28} className="text-gray-300 mb-2" />
                <p className="text-sm text-gray-400">让 Luka 帮你搭配</p>
              </div>
            </div>
          </>
        )}

        {/* Tab 1: 衣帽间 */}
        {activeTab === 1 && (
          <>
            {/* Luka 今日推荐 */}
            <div className="mb-4">
              <div className="bg-primary/5 rounded p-3 border border-primary/10">
                <div className="flex items-center gap-2 mb-3">
                  <LukaAvatar size="sm" />
                  <div>
                    <p className="text-xs text-gray-500">Luka 说</p>
                    <p className="text-sm font-medium">{todayOutfit.greeting}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  {todayOutfit.items.map((item) => (
                    <div key={item.id} onClick={() => navigate(`/closet/${item.id}`)} className="flex-1 cursor-pointer">
                      <div className="aspect-square rounded overflow-hidden bg-white mb-1">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-xs text-gray-600 truncate">{item.name}</p>
                    </div>
                  ))}
                  <div className="flex-1 aspect-square rounded border-2 border-dashed border-gray-200 flex items-center justify-center bg-white/50 cursor-pointer">
                    <div className="text-center">
                      <Icon name="add" size={20} className="text-gray-300 mx-auto" />
                      <p className="text-[10px] text-gray-400 mt-1">添加</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 分类标签 */}
            <div className="style-tags">
              {categories.map((cat, index) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(index)}
                  className={`style-tag ${
                    index === activeCategory ? 'style-tag-active' : 'style-tag-inactive'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 衣服网格 */}
            <CardMasonry columns={{ default: 2 }} gap={6}>
              {filteredClothes.map((cloth, index) => {
                const aspectRatios = ['aspect-card-1', 'aspect-card-2', 'aspect-card-3', 'aspect-card-4']
                const aspectRatio = aspectRatios[index % aspectRatios.length]

                return (
                  <div
                    key={cloth.id}
                    onClick={() => navigate(`/closet/${cloth.id}`)}
                    className="card-masonry card-interactive"
                  >
                    <div className={`relative ${aspectRatio}`}>
                      <ImageSwap
                        mainImage={cloth.modelImage}
                        thumbImage={cloth.clothImage}
                        alt={cloth.name}
                        className="w-full h-full"
                        thumbSize="md"
                      />
                      {/* 状态标签 */}
                      {cloth.status !== 'owned' && (
                        <div className="absolute top-1.5 left-1.5 z-10">
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded text-white ${statusConfig[cloth.status].color}`}>
                            {statusConfig[cloth.status].text}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <p className="text-[13px] font-medium line-clamp-1">{cloth.name}</p>
                    </div>
                  </div>
                )
              })}

              {/* 添加新衣服 */}
              <div
                onClick={() => navigate('/luka')}
                className="aspect-card-1 bg-gray-50 rounded flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-200"
              >
                <Icon name="auto_awesome" size={28} className="text-gray-300 mb-1" />
                <p className="text-[10px] text-gray-400">许个新愿望</p>
              </div>
            </CardMasonry>
          </>
        )}

        {/* Tab 2: 灵感 - 记录想法 */}
        {activeTab === 2 && (
          <div className="space-y-3">
            {/* 输入新想法 */}
            <div
              onClick={() => navigate('/luka')}
              className="bg-white rounded p-3 border border-gray-200 cursor-pointer active:scale-[0.99] transition-transform"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Icon name="edit_note" size={20} className="text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400">记录一个想法...</p>
                </div>
                <Icon name="add_photo_alternate" size={20} className="text-gray-300" />
              </div>
            </div>

            {/* 灵感列表 */}
            {myInspirations.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded p-3 border cursor-pointer active:scale-[0.99] transition-transform ${
                  item.status === 'realized' ? 'border-emerald-200 bg-emerald-50/30' : 'border-gray-100'
                }`}
              >
                <div className="flex gap-3">
                  {/* 图片（如果有） */}
                  {item.image && (
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    {/* 状态标签 */}
                    {item.status === 'realized' && (
                      <span className="inline-block text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-500 text-white mb-1">
                        已变成愿望
                      </span>
                    )}

                    {/* 内容 */}
                    <p className="text-sm text-gray-700 line-clamp-2">{item.text}</p>

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* 底部 */}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-gray-400">{item.time}</span>
                      {item.status !== 'realized' && (
                        <button
                          onClick={(e) => { e.stopPropagation(); navigate('/luka'); }}
                          className="text-[11px] text-primary font-medium"
                        >
                          让 Luka 实现
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: 心愿单 */}
        {activeTab === 3 && (
          <>
            {/* 提示卡片 */}
            <div className="bg-primary/5 rounded p-3 border border-primary/10 mb-4">
              <div className="flex items-center gap-2">
                <LukaAvatar size="sm" />
                <p className="text-sm text-gray-600">看到喜欢的衣服？加入心愿单，我帮你实现~</p>
              </div>
            </div>

            <CardMasonry columns={{ default: 2 }} gap={6}>
              {myCollections.map((item, index) => {
                const aspectRatios = ['aspect-card-1', 'aspect-card-2', 'aspect-card-3', 'aspect-card-4']
                const aspectRatio = aspectRatios[index % aspectRatios.length]

                return (
                  <div
                    key={item.id}
                    className="card-masonry card-interactive"
                  >
                    <div className={`relative ${aspectRatio}`}>
                      <ImageSwap
                        mainImage={item.modelImage}
                        thumbImage={item.clothImage}
                        alt={item.name}
                        className="w-full h-full"
                        thumbSize="md"
                      />
                      {/* 来源标签 */}
                      <div className="absolute top-1.5 right-1.5 z-10">
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-black/40 text-white backdrop-blur-sm">
                          {item.from}
                        </span>
                      </div>
                    </div>
                    <div className="p-2">
                      <p className="text-[13px] font-medium line-clamp-1">{item.name}</p>
                      <button className="mt-1.5 text-xs text-primary font-medium">让 Luka 实现</button>
                    </div>
                  </div>
                )
              })}

              {/* 添加心愿 */}
              <div className="aspect-card-1 bg-gray-50 rounded flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-200">
                <Icon name="add_photo_alternate" size={28} className="text-gray-300 mb-1" />
                <p className="text-[10px] text-gray-400">添加心愿</p>
              </div>
            </CardMasonry>
          </>
        )}

        {/* 底部提示 */}
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm">
            {activeTab === 0 && '让 Luka 帮你搭配更多穿法'}
            {activeTab === 1 && '告诉 Luka 你想要什么'}
            {activeTab === 2 && '有想法就告诉 Luka'}
            {activeTab === 3 && '看到喜欢的就加入心愿单'}
          </p>
        </div>
      </div>
    </Layout>
  )
}

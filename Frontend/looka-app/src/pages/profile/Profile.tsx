import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Icon, ImageSwap, CardMasonry } from '@/components'

const profileTabs = ['我许的愿', '想要的', '分享']

// 我许的愿望
const myWishes = [
  {
    id: '1',
    modelImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400',
    clothImage: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=200',
    name: '星空渐变长裙',
    status: 'making',
    wantCount: 23,
  },
  {
    id: '2',
    modelImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
    clothImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200',
    name: '复古格纹西装',
    status: 'collecting',
    wantCount: 18,
  },
  {
    id: '3',
    modelImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400',
    clothImage: 'https://images.unsplash.com/photo-1485968579169-a6b12a6e05ff?w=200',
    name: '极简白衬衫',
    status: 'done',
    wantCount: 45,
  },
]

const statusText: Record<string, string> = {
  collecting: '等人一起',
  making: '制作中',
  done: '已实现',
}

const statusColor: Record<string, string> = {
  collecting: 'bg-primary text-white',
  making: 'bg-amber-500 text-white',
  done: 'bg-emerald-500 text-white',
}

export function ProfilePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)

  const userAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'

  return (
    <Layout>
      {/* Header */}
      <div className="header-main">
        <div className="header-main-inner">
          <button className="header-btn-start">
            <Icon name="settings" size={24} className="text-gray-600" />
          </button>
          <div className="header-btn-end">
            <Icon name="share" size={24} className="text-gray-600" />
          </div>
        </div>
      </div>

      <div className="content-masonry">
        {/* Profile Section */}
        <div className="pt-4 pb-4">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 ring-2 ring-white shadow-lg">
              <img
                src={userAvatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-lg font-bold truncate">Ava</h2>
                <button className="text-xs px-3 py-1.5 border border-gray-200 rounded-full font-medium text-gray-600 flex-shrink-0">
                  编辑
                </button>
              </div>
              <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">
                用 Luka 实现我所有的穿搭梦想 ✨
              </p>

              {/* Stats - 符合产品逻辑 */}
              <div className="flex items-center gap-5 mt-3">
                <div className="text-center">
                  <div className="font-bold text-[15px]">3</div>
                  <div className="text-[11px] text-gray-400">许愿</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-[15px]">8</div>
                  <div className="text-[11px] text-gray-400">想要</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-[15px]">5</div>
                  <div className="text-[11px] text-gray-400">分享</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body Profile Card */}
        <div className="mb-4">
          <div
            onClick={() => navigate('/body-profile')}
            className="bg-primary/5 rounded p-4 flex items-center justify-between border border-primary/10 cursor-pointer active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white">
                <Icon name="accessibility_new" size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold">身材档案</h4>
                <p className="text-[11px] text-gray-500">让 Luka 更懂你的身材</p>
              </div>
            </div>
            <Icon name="chevron_right" size={20} className="text-primary" />
          </div>
        </div>

        {/* Content Tabs */}
        <div className="tabs-content" style={{ top: 'var(--header-height)' }}>
          <div className="tabs-content-inner">
            {profileTabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={`tab-content ${
                  index === activeTab ? 'tab-content-active' : 'tab-content-inactive'
                }`}
              >
                {tab}
                {index === activeTab && <span className="tab-indicator" />}
              </button>
            ))}
          </div>
        </div>

        {/* Wishes Grid */}
        <div className="py-4">
          <CardMasonry columns={{ default: 2 }} gap={6}>
            {myWishes.map((wish, index) => {
              const aspectRatios = ['aspect-card-1', 'aspect-card-2', 'aspect-card-3', 'aspect-card-4']
              const aspectRatio = aspectRatios[index % aspectRatios.length]

              return (
                <div
                  key={wish.id}
                  onClick={() => navigate(`/group-buy/${wish.id}`)}
                  className="bg-white rounded overflow-hidden cursor-pointer active:scale-[0.98] transition-transform border border-gray-200"
                >
                  {/* 图片区域 */}
                  <div className={`relative ${aspectRatio}`}>
                    <ImageSwap
                      mainImage={wish.modelImage}
                      thumbImage={wish.clothImage}
                      alt={wish.name}
                      className="w-full h-full"
                      thumbSize="md"
                    />
                    {/* 右下角想要人数 */}
                    <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 z-10">
                      <Icon name="favorite" size={12} className="text-primary" filled />
                      <span className="text-white text-[10px] font-medium">{wish.wantCount}</span>
                    </div>
                    {/* 状态标签 */}
                    <div className="absolute top-1.5 left-1.5 z-10">
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${statusColor[wish.status]}`}>
                        {statusText[wish.status]}
                      </span>
                    </div>
                  </div>
                  {/* 信息 */}
                  <div className="p-2.5">
                    <p className="text-[13px] font-bold line-clamp-1">{wish.name}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <img
                        src={userAvatar}
                        alt=""
                        className="w-4 h-4 rounded-full object-cover"
                      />
                      <span className="text-[10px] text-gray-400">我许的愿</span>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* 添加新愿望 */}
            <div
              onClick={() => navigate('/luka')}
              className="aspect-card-1 bg-gray-50 rounded flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-200 active:scale-[0.98] transition-transform"
            >
              <Icon name="auto_awesome" size={32} className="text-gray-300 mb-2" />
              <p className="text-xs text-gray-400">许个新愿望</p>
            </div>
          </CardMasonry>
        </div>
      </div>
    </Layout>
  )
}

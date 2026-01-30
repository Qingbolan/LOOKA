import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Icon, Badge, LukaAvatar } from '@/components'

const tabs = ['进行中', '即将成真', '已实现']

// 正在一起实现的愿望
const wishes = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400',
    title: '星空渐变连衣裙',
    description: '深蓝到紫色的渐变，像银河一样',
    currentPeople: 18,
    targetPeople: 30,
    daysLeft: 5,
    creator: {
      name: '梦想家小美',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    },
    isJoined: true,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
    title: '复古格纹西装外套',
    description: '英伦风，微微oversized',
    currentPeople: 24,
    targetPeople: 30,
    daysLeft: 3,
    creator: {
      name: '职场穿搭',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    },
    isJoined: false,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
    title: '极简主义白衬衫',
    description: '高级面料，完美版型',
    currentPeople: 45,
    targetPeople: 50,
    daysLeft: 2,
    creator: {
      name: '设计师阿白',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    },
    isJoined: false,
    isAlmostThere: true,
  },
]

// 动态
const activities = [
  {
    id: '1',
    type: 'join',
    wishTitle: '星空渐变连衣裙',
    user: { name: '小红', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
    time: '3分钟前',
  },
  {
    id: '2',
    type: 'remix',
    wishTitle: '我的复古碎花裙',
    user: { name: 'Fashion_Lily', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    time: '10分钟前',
  },
  {
    id: '3',
    type: 'almost',
    wishTitle: '极简主义白衬衫',
    remaining: 5,
    time: '1小时前',
  },
]

export function TogetherPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Layout>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="flex flex-col max-w-md mx-auto">
          <div className="flex items-center p-4 h-14 justify-between">
            <h1 className="text-xl font-bold">一起</h1>
            <button className="size-10 flex items-center justify-center">
              <Icon name="notifications" size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex px-4 pb-3 gap-6">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={`text-[15px] transition-colors pb-1 ${
                  index === activeTab
                    ? 'font-bold text-gray-900 border-b-2 border-primary'
                    : 'font-medium text-gray-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-md mx-auto p-4 pb-32 space-y-6">
        {/* 动态提醒 */}
        {activities.length > 0 && (
          <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="notifications_active" size={18} className="text-primary" />
              <span className="text-sm font-bold">最新动态</span>
            </div>
            <div className="space-y-3">
              {activities.slice(0, 2).map((activity) => (
                <div key={activity.id} className="flex items-center gap-3">
                  {activity.type === 'almost' ? (
                    <>
                      <LukaAvatar size="sm" />
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-bold">{activity.wishTitle}</span>
                          <span className="text-gray-500"> 还差 </span>
                          <span className="text-primary font-bold">{activity.remaining}</span>
                          <span className="text-gray-500"> 人就能成真啦！</span>
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src={activity.user?.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-bold">{activity.user?.name}</span>
                          <span className="text-gray-500">
                            {activity.type === 'join' ? ' 也想要 ' : ' remix 了你的 '}
                          </span>
                          <span className="font-bold">{activity.wishTitle}</span>
                        </p>
                      </div>
                    </>
                  )}
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 愿望卡片列表 */}
        <div className="space-y-4">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              onClick={() => navigate(`/group-buy/${wish.id}`)}
              className={`
                bg-white rounded-2xl overflow-hidden shadow-soft border
                cursor-pointer active:scale-[0.99] transition-transform
                ${wish.isAlmostThere
                  ? 'border-primary/30 ring-2 ring-primary/10'
                  : 'border-gray-100'}
              `}
            >
              <div className="flex">
                {/* 图片 */}
                <div className="w-28 h-28 flex-shrink-0 bg-gray-100">
                  <img
                    src={wish.image}
                    alt={wish.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 内容 */}
                <div className="flex-1 p-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-[15px] line-clamp-1">{wish.title}</h3>
                      {wish.isAlmostThere && (
                        <Badge variant="wishing" size="sm">即将成真</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{wish.description}</p>
                  </div>

                  {/* 进度 */}
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-gray-500">
                        <span className="text-primary font-bold">{wish.currentPeople}</span>
                        /{wish.targetPeople} 人想要
                      </span>
                      <span className="text-gray-400">还剩 {wish.daysLeft} 天</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(wish.currentPeople / wish.targetPeople) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* 底部 */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1.5">
                      <img
                        src={wish.creator.avatar}
                        alt=""
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-[11px] text-gray-500">{wish.creator.name}</span>
                    </div>
                    {wish.isJoined && (
                      <Badge variant="owned" size="sm">已加入</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 空状态提示 */}
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm">发现更多人的愿望，一起让它成真</p>
        </div>
      </main>
    </Layout>
  )
}

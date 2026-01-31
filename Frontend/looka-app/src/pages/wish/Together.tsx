import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Icon, Badge, LukaAvatar, ImageSwap } from '@/components'
import { GroupBuyListSkeleton, EmptyGroupBuy, NetworkError } from '@/components/feedback'
import { useWishStore } from '@/store'
import { WishStatus } from '@/types'
import { formatCountdown } from '@/utils/format'
import { QuickJoinButton } from '@/components/wish/JoinWishButton'

// 情感化 Tab 名称
const tabs = ['等你加入', '快达成啦', '梦想成真']

// 动态（保持模拟数据，后续可接入真实 API）
const activities = [
  {
    id: '1',
    type: 'join' as const,
    wishTitle: '星空渐变连衣裙',
    user: { name: '小红', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
    time: '3分钟前',
  },
  {
    id: '2',
    type: 'remix' as const,
    wishTitle: '我的复古碎花裙',
    user: { name: 'Fashion_Lily', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    time: '10分钟前',
  },
  {
    id: '3',
    type: 'almost' as const,
    wishTitle: '极简主义白衬衫',
    remaining: 5,
    time: '1小时前',
  },
]

export function TogetherPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const { groupBuys, fetchGroupBuys, hasJoinedGroupBuy } = useWishStore()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(false)
      try {
        const statusMap: Record<number, WishStatus | undefined> = {
          0: 'active',
          1: 'active', // 过滤显示进度 > 80%
          2: 'success',
        }
        await fetchGroupBuys({ status: statusMap[activeTab] })
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [activeTab, fetchGroupBuys])

  // 根据 tab 过滤显示
  const filteredWishes = groupBuys.filter(wish => {
    if (activeTab === 1) {
      // 即将成真：进度 > 80%
      return wish.progress >= 80 && wish.status !== 'success'
    }
    return true
  })

  const handleRetry = () => {
    fetchGroupBuys()
  }

  return (
    <Layout>
      {/* Header */}
      <div className="header-main">
        <div className="header-main-inner">
          <h1 className="header-title">一起</h1>
          <div className="tabs-header">
            {tabs.map((tab, index) => (
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
            <Icon name="notifications" size={22} className="text-gray-600" />
          </button>
        </div>
      </div>

      <main className="content-page py-3 space-y-4">
        {/* 动态提醒 */}
        {activities.length > 0 && activeTab === 0 && (
          <div className="bg-primary/5 rounded p-3 border border-primary/10">
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

        {/* 加载状态 */}
        {loading && <GroupBuyListSkeleton count={4} />}

        {/* 错误状态 */}
        {error && !loading && <NetworkError onRetry={handleRetry} />}

        {/* 空状态 */}
        {!loading && !error && filteredWishes.length === 0 && <EmptyGroupBuy />}

        {/* 愿望卡片列表 */}
        {!loading && !error && filteredWishes.length > 0 && (
          <div className="space-y-3">
            {filteredWishes.map((wish) => {
              const isAlmostThere = wish.progress >= 80
              const isJoined = hasJoinedGroupBuy(wish.id)
              const daysLeft = Math.ceil(wish.remainingTime / 86400)

              return (
                <div
                  key={wish.id}
                  onClick={() => navigate(`/group-buy/${wish.id}`)}
                  className={`
                    bg-white rounded overflow-hidden
                    cursor-pointer active:scale-[0.99] transition-transform
                    ${isAlmostThere ? 'ring-1 ring-primary/30' : ''}
                  `}
                >
                  <div className="flex">
                    {/* 图片 */}
                    <ImageSwap
                      mainImage={wish.product.image}
                      thumbImage={wish.product.image}
                      alt={wish.product.name}
                      className="w-24 h-24 flex-shrink-0 rounded overflow-hidden"
                      thumbSize="sm"
                    />

                    {/* 内容 */}
                    <div className="flex-1 p-2.5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-[13px] line-clamp-1">
                            {wish.product.name}
                          </h3>
                          {isAlmostThere && (
                            <Badge variant="wishing" size="sm">快了</Badge>
                          )}
                          {wish.type === 'flash' && (
                            <Badge variant="making" size="sm">限时</Badge>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          省 {wish.savingsPercent}% · ¥{wish.groupPrice}
                        </p>
                      </div>

                      {/* 进度 */}
                      <div className="mt-1.5">
                        <div className="flex items-center justify-between text-[10px] mb-1">
                          <span className="text-gray-500">
                            <span className="text-primary font-bold">{wish.currentCount}</span>
                            /{wish.targetCount} 人
                          </span>
                          <span className="text-gray-400">
                            {daysLeft > 0 ? `${daysLeft}天` : formatCountdown(wish.remainingTime)}
                          </span>
                        </div>
                        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${wish.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* 底部 */}
                      <div className="flex items-center justify-between mt-1.5">
                        <div className="flex items-center -space-x-1">
                          {wish.participantAvatars.slice(0, 3).map((avatar, i) => (
                            <img
                              key={i}
                              src={avatar}
                              alt=""
                              className="w-4 h-4 rounded-full object-cover border border-white"
                            />
                          ))}
                          {wish.currentCount > 3 && (
                            <span className="text-[10px] text-gray-500 ml-1">
                              +{wish.currentCount - 3}
                            </span>
                          )}
                        </div>
                        <QuickJoinButton
                          remaining={wish.targetCount - wish.currentCount}
                          hasJoined={isJoined}
                          onJoin={() => {
                            // Navigate to detail for full join flow
                            navigate(`/wish/${wish.id}`)
                          }}
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* 空状态提示 */}
        {!loading && !error && filteredWishes.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm">发现更多人的愿望，一起让它成真</p>
          </div>
        )}

        {/* 创作入口 */}
        <div
          onClick={() => navigate('/design/editor')}
          className="fixed bottom-24 right-4 size-14 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center shadow-lg cursor-pointer active:scale-95 transition-transform z-40"
          style={{ boxShadow: '0 4px 20px rgba(196, 146, 138, 0.4)' }}
        >
          <span className="text-xl">✨</span>
        </div>
      </main>
    </Layout>
  )
}

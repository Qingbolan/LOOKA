import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Icon, ImageSwap, CardMasonry } from '@/components'
import { ProfileSkeleton, ProfileContentSkeleton } from '@/components/feedback'
import { useAuthStore } from '@/store'
import { useRefreshWithDeps } from '@/hooks'
import {
  profileTabs,
  statusText,
  statusColor,
  myWishes,
  defaultUserAvatar,
  defaultUserProfile,
} from '@/mocks'

export function ProfilePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)

  // 从 authStore 获取用户数据（如果已登录）
  const { user } = useAuthStore()

  // 使用 authStore 用户数据或默认数据
  const userAvatar = user?.avatar || defaultUserAvatar
  const userName = user?.nickname || defaultUserProfile.name
  const userBio = defaultUserProfile.bio // 后续从用户 profile 获取
  const userStats = defaultUserProfile.stats // 后续可从 API 获取

  // 模拟 API 调用
  const fetchProfileData = useCallback(async () => {
    // 后续替换为真实 API
    // const data = await profileApi.getWishes({ tab: activeTab })
    return { success: true }
  }, [activeTab])

  const { loading } = useRefreshWithDeps(fetchProfileData, [])

  // Tab 切换时的加载
  const fetchTabData = useCallback(async () => {
    // 后续替换为真实 API
    return { success: true }
  }, [activeTab])

  const { loading: contentLoading } = useRefreshWithDeps(fetchTabData, [activeTab])

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
        {/* 初始加载骨架屏 */}
        {loading && <ProfileSkeleton />}

        {/* Profile Section */}
        {!loading && (
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
                  <h2 className="text-lg font-bold truncate">{userName}</h2>
                  <button className="text-xs px-3 py-1.5 border border-gray-200 rounded-full font-medium text-gray-600 flex-shrink-0">
                    编辑
                  </button>
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">
                  {userBio}
                </p>

                {/* Stats - 符合产品逻辑 */}
                <div className="flex items-center gap-5 mt-3">
                  <div className="text-center">
                    <div className="font-bold text-[15px]">{userStats.wishes}</div>
                    <div className="text-[11px] text-gray-400">许愿</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-[15px]">{userStats.wants}</div>
                    <div className="text-[11px] text-gray-400">想要</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-[15px]">{userStats.shares}</div>
                    <div className="text-[11px] text-gray-400">分享</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Body Profile Card */}
        {!loading && (
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
        )}

        {/* Content Tabs */}
        {!loading && (
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
        )}

        {/* 内容加载骨架屏 */}
        {!loading && contentLoading && (
          <div className="py-4">
            <ProfileContentSkeleton />
          </div>
        )}

        {/* Wishes Grid */}
        {!loading && !contentLoading && (
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
        )}
      </div>
    </Layout>
  )
}

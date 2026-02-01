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
  const userBio = defaultUserProfile.bio
  const userStats = defaultUserProfile.stats

  // 用户标签
  const userTags = ['时尚达人', '极简主义', '复古风']

  // 模拟 API 调用
  const fetchProfileData = useCallback(async () => {
    return { success: true }
  }, [])

  const { loading } = useRefreshWithDeps(fetchProfileData, [])

  // Tab 切换时的加载
  const fetchTabData = useCallback(async () => {
    return { success: true }
  }, [activeTab])

  const { loading: contentLoading } = useRefreshWithDeps(fetchTabData, [activeTab])

  return (
    <Layout>
      {/* Header */}
      <div className="header-main">
        <div className="header-main-inner">
          <button className="header-btn-start">
            <Icon name="menu" size={24} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <button className="header-btn">
              <Icon name="qr_code_scanner" size={22} className="text-gray-600" />
            </button>
            <button className="header-btn">
              <Icon name="share" size={22} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4">
        {/* 初始加载骨架屏 */}
        {loading && <ProfileSkeleton />}

        {/* Profile Section */}
        {!loading && (
          <div className="pt-6 pb-4">
            {/* Avatar + Name Row */}
            <div className="flex items-center gap-4 mb-4">
              {/* Avatar with + button */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 ring-4 ring-white shadow-lg">
                  <img
                    src={userAvatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* + Button */}
                <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shadow-md border-2 border-white">
                  <Icon name="add" size={18} />
                </button>
              </div>

              {/* Name and ID */}
              <div className="flex-1">
                <h1 className="text-xl font-bold text-gray-900">{userName}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-400">LOOKA ID: looka_user</span>
                  <Icon name="qr_code" size={16} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              {userBio}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {userTags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{userStats.wishes}</div>
                  <div className="text-xs text-gray-400">许愿</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{userStats.wants}</div>
                  <div className="text-xs text-gray-400">想要</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{userStats.shares}</div>
                  <div className="text-xs text-gray-400">分享</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/profile/edit')}
                  className="px-4 py-2 border border-gray-200 rounded-full text-sm font-medium text-gray-700"
                >
                  编辑资料
                </button>
                <button
                  onClick={() => navigate('/settings')}
                  className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center"
                >
                  <Icon name="settings" size={18} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={() => navigate('/body-profile')}
                className="p-4 bg-gray-50 rounded-xl text-left active:scale-[0.98] transition-transform"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="accessibility_new" size={18} className="text-primary" />
                  <span className="font-semibold text-sm text-gray-900">身材档案</span>
                </div>
                <p className="text-xs text-gray-400">让洛卡更懂你</p>
              </button>
              <button
                onClick={() => navigate('/luka')}
                className="p-4 bg-gray-50 rounded-xl text-left active:scale-[0.98] transition-transform"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="auto_awesome" size={18} className="text-primary" />
                  <span className="font-semibold text-sm text-gray-900">洛卡对话</span>
                </div>
                <p className="text-xs text-gray-400">AI 设计助手</p>
              </button>
            </div>
          </div>
        )}

        {/* Content Tabs */}
        {!loading && (
          <div className="border-b border-gray-100 mb-4">
            <div className="flex">
              {profileTabs.map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(index)}
                  className={`flex-1 py-3 text-sm font-medium relative transition-colors ${
                    index === activeTab
                      ? 'text-gray-900'
                      : 'text-gray-400'
                  }`}
                >
                  {tab}
                  {index === activeTab && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                  )}
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
          <div className="pb-8">
            <CardMasonry columns={{ default: 2 }} gap={8}>
              {myWishes.map((wish, index) => {
                const aspectRatios = ['aspect-card-1', 'aspect-card-2', 'aspect-card-3', 'aspect-card-4']
                const aspectRatio = aspectRatios[index % aspectRatios.length]

                return (
                  <div
                    key={wish.id}
                    onClick={() => navigate(`/group-buy/${wish.id}`)}
                    className="bg-white rounded-xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform shadow-sm"
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
                        <Icon name="favorite" size={12} className="text-white" filled />
                        <span className="text-white text-xs font-medium">{wish.wantCount}</span>
                      </div>
                      {/* 状态标签 */}
                      <div className="absolute top-2 left-2 z-10">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor[wish.status]}`}>
                          {statusText[wish.status]}
                        </span>
                      </div>
                    </div>
                    {/* 信息 */}
                    <div className="p-3">
                      <p className="text-sm font-semibold line-clamp-2 text-gray-900">{wish.name}</p>
                    </div>
                  </div>
                )
              })}

              {/* 添加新愿望 */}
              <div
                onClick={() => navigate('/luka')}
                className="aspect-card-1 bg-gray-50 rounded-xl flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-200 active:scale-[0.98] transition-transform"
              >
                <Icon name="add" size={32} className="text-gray-300 mb-2" />
                <p className="text-xs text-gray-400">许个新愿望</p>
              </div>
            </CardMasonry>
          </div>
        )}
      </div>
    </Layout>
  )
}

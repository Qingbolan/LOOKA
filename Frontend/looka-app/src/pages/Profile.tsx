import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Icon, Card } from '@/components'

const profileTabs = ['发布', '收藏', '衣柜']

const userPosts = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400',
    title: '今日赛博和服试穿，这个面料的AI质感太绝了！',
    likes: '1.2k',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400',
    title: '秋季胶囊衣柜：用AI生成我的专属穿搭灵感库',
    likes: '856',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400',
    title: '手把手教你定制属于自己的AI廓形大衣',
    likes: '2.1k',
  },
]

export function ProfilePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Layout>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-xl border-b border-black/[0.03] dark:border-white/[0.06]">
        <div className="flex items-center p-4 h-14 justify-between max-w-md mx-auto">
          <button className="size-10 flex items-center justify-start">
            <Icon name="menu" size={24} className="text-text-primary dark:text-text-dark-primary" />
          </button>
          <div className="size-10 flex items-center justify-end">
            <Icon name="share" size={24} className="text-text-primary dark:text-text-dark-primary" />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto pb-32">
        {/* Profile Section */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-2 border-white dark:border-surface-dark shadow-md overflow-hidden bg-gray-100 dark:bg-white/10">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-gradient-to-r from-primary to-pink-500 text-white p-1.5 rounded-full border-2 border-white dark:border-surface-dark">
                <Icon name="add" size={12} />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 ml-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-text-primary dark:text-text-dark-primary">时尚主理人_Ava</h2>
                <button className="text-xs px-3 py-1.5 border border-black/10 dark:border-white/20 rounded-full font-medium text-text-secondary dark:text-text-dark-secondary">
                  编辑资料
                </button>
              </div>
              <p className="text-[13px] text-text-secondary dark:text-text-dark-secondary mb-3 leading-relaxed">
                追求极致的赛博时尚与AI美学。这里有我所有的虚拟试穿灵感。
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="font-bold text-[15px] text-text-primary dark:text-text-dark-primary">12.8k</div>
                  <div className="text-[11px] text-text-muted dark:text-text-dark-muted">获赞</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-[15px] text-text-primary dark:text-text-dark-primary">3,420</div>
                  <div className="text-[11px] text-text-muted dark:text-text-dark-muted">粉丝</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-[15px] text-text-primary dark:text-text-dark-primary">286</div>
                  <div className="text-[11px] text-text-muted dark:text-text-dark-muted">关注</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body Profile Card */}
        <div className="px-4 mb-6">
          <Card
            variant="dream"
            padding="md"
            onClick={() => navigate('/body-profile')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-gradient-to-r from-primary to-pink-500 flex items-center justify-center text-white">
                  <Icon name="accessibility_new" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary dark:text-text-dark-primary">身材档案</h4>
                  <p className="text-[11px] text-text-secondary dark:text-text-dark-secondary">同步至AI试穿助手，获取最佳尺码建议</p>
                </div>
              </div>
              <Icon name="chevron_right" size={20} className="text-primary" />
            </div>
          </Card>
        </div>

        {/* Content Tabs */}
        <div className="sticky top-14 z-40 bg-white dark:bg-background-dark border-b border-black/[0.03] dark:border-white/[0.06]">
          <div className="flex justify-around max-w-md mx-auto">
            {profileTabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={`py-3 text-[15px] px-4 ${
                  index === activeTab
                    ? 'font-bold text-primary border-b-2 border-primary'
                    : 'font-medium text-text-muted dark:text-text-dark-muted'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="p-4 grid grid-cols-2 gap-3">
          {userPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate(`/product/${post.id}`)}
              className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-soft dark:shadow-none border border-black/[0.03] dark:border-white/[0.06] cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div
                className="aspect-[3/4] bg-gray-100 dark:bg-white/5 bg-cover bg-center"
                style={{ backgroundImage: `url(${post.image})` }}
              />
              <div className="p-2.5">
                <p className="text-[13px] font-medium line-clamp-2 leading-tight mb-2 text-text-primary dark:text-text-dark-primary">
                  {post.title}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-white/20" />
                    <span className="text-[10px] text-text-muted dark:text-text-dark-muted">Ava</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-text-muted dark:text-text-dark-muted">
                    <Icon name="favorite" size={12} />
                    <span className="text-[10px]">{post.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

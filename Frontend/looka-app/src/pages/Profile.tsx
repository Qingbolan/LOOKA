import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Icon } from '@/components'

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
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-50">
        <div className="flex items-center p-4 h-14 justify-between max-w-md mx-auto">
          <button className="size-10 flex items-center justify-start">
            <Icon name="menu" size={24} />
          </button>
          <div className="size-10 flex items-center justify-end">
            <Icon name="share" size={24} />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto pb-32">
        {/* Profile Section */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-2 border-white shadow-md overflow-hidden bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-gradient-to-r from-primary to-pink-500 text-white p-1.5 rounded-full border-2 border-white">
                <Icon name="add" size={12} />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 ml-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold">时尚主理人_Ava</h2>
                <button className="text-xs px-3 py-1.5 border border-gray-200 rounded-full font-medium text-gray-600">
                  编辑资料
                </button>
              </div>
              <p className="text-[13px] text-gray-500 mb-3 leading-relaxed">
                追求极致的赛博时尚与AI美学。这里有我所有的虚拟试穿灵感。
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="font-bold text-[15px]">12.8k</div>
                  <div className="text-[11px] text-gray-400">获赞</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-[15px]">3,420</div>
                  <div className="text-[11px] text-gray-400">粉丝</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-[15px]">286</div>
                  <div className="text-[11px] text-gray-400">关注</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body Profile Card */}
        <div className="px-4 mb-6">
          <div
            onClick={() => navigate('/body-profile')}
            className="bg-gradient-to-r from-primary/5 via-pink-50 to-primary/5 rounded-2xl p-4 flex items-center justify-between border border-primary/10 cursor-pointer active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-gradient-to-r from-primary to-pink-500 flex items-center justify-center text-white">
                <Icon name="accessibility_new" size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold">身材档案</h4>
                <p className="text-[11px] text-gray-500">同步至AI试穿助手，获取最佳尺码建议</p>
              </div>
            </div>
            <Icon name="chevron_right" size={20} className="text-primary" />
          </div>
        </div>

        {/* Content Tabs */}
        <div className="sticky top-14 z-40 bg-white border-b border-gray-50">
          <div className="flex justify-around max-w-md mx-auto">
            {profileTabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={`py-3 text-[15px] px-4 ${
                  index === activeTab
                    ? 'font-bold text-primary border-b-2 border-primary'
                    : 'font-medium text-gray-400'
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
              className="bg-white rounded-2xl overflow-hidden shadow-soft border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div
                className="aspect-[3/4] bg-gray-100 bg-cover bg-center"
                style={{ backgroundImage: `url(${post.image})` }}
              />
              <div className="p-2.5">
                <p className="text-[13px] font-medium line-clamp-2 leading-tight mb-2">
                  {post.title}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-gray-200" />
                    <span className="text-[10px] text-gray-400">Ava</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-gray-400">
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

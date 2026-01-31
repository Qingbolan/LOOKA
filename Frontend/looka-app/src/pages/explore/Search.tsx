import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Icon } from '@/components'

// 最近搜索
const recentSearches = ['星空渐变', '白衬衫', '复古', '极简风']

// 发现
const discovers = [
  { text: '春季新款连衣裙', hot: false },
  { text: '通勤穿搭', hot: true },
  { text: '小个子显高', hot: false },
  { text: '氛围感穿搭', hot: false },
]

// 热门搜索
const hotSearches = [
  { rank: 1, text: '早春穿搭灵感', hot: true, count: '326.5k' },
  { rank: 2, text: '显瘦连衣裙', hot: true, count: '298.2k' },
  { rank: 3, text: '法式优雅风', hot: true, count: '256.8k' },
  { rank: 4, text: '极简主义衣橱', hot: false, count: '198.3k' },
  { rank: 5, text: '职场穿搭公式', hot: false, count: '167.9k' },
  { rank: 6, text: '小众设计师品牌', hot: false, count: '145.2k' },
  { rank: 7, text: '可持续时尚', hot: true, count: '132.6k' },
  { rank: 8, text: '一衣多穿技巧', hot: false, count: '98.7k' },
]

export function SearchPage() {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')

  const handleSearch = () => {
    if (searchText.trim()) {
      // TODO: 执行搜索
      console.log('搜索:', searchText)
    }
  }

  const handleTagClick = (text: string) => {
    setSearchText(text)
  }

  return (
    <Layout showTabBar={false}>
      {/* 搜索栏 */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2 px-3 py-2 max-w-md mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="size-10 flex items-center justify-center flex-shrink-0"
          >
            <Icon name="arrow_back_ios" size={20} className="text-gray-600" />
          </button>
          <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 h-10">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="搜索你想要的风格..."
              className="flex-1 bg-transparent text-sm outline-none"
              autoFocus
            />
            {searchText && (
              <button onClick={() => setSearchText('')} className="p-1">
                <Icon name="close" size={16} className="text-gray-400" />
              </button>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="px-3 h-10 text-primary font-medium text-sm flex-shrink-0"
          >
            搜索
          </button>
        </div>
      </div>

      <main className="max-w-md mx-auto px-4 pb-8">
        {/* 最近搜索 */}
        {recentSearches.length > 0 && (
          <div className="py-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[15px]">最近搜索</h3>
              <button className="p-1">
                <Icon name="delete_outline" size={18} className="text-gray-400" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((item) => (
                <button
                  key={item}
                  onClick={() => handleTagClick(item)}
                  className="px-3 py-1.5 bg-gray-100 rounded-full text-[13px] text-gray-600"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 发现 */}
        <div className="py-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-[15px]">发现</h3>
            <button className="p-1">
              <Icon name="more_horiz" size={18} className="text-gray-400" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {discovers.map((item) => (
              <button
                key={item.text}
                onClick={() => handleTagClick(item.text)}
                className="flex items-center gap-1 text-left"
              >
                <span className="text-[13px] text-gray-700">{item.text}</span>
                {item.hot && (
                  <span className="px-1 py-0.5 bg-primary text-white text-[10px] rounded">热</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* LOOKA 热点 */}
        <div className="py-4 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="local_fire_department" size={20} className="text-primary" />
            <h3 className="font-bold text-[15px]">LOOKA 热点</h3>
          </div>
          <div className="space-y-3">
            {hotSearches.map((item) => (
              <button
                key={item.rank}
                onClick={() => handleTagClick(item.text)}
                className="flex items-center gap-3 w-full text-left"
              >
                <span className={`w-5 text-center font-bold text-[15px] ${
                  item.rank <= 3 ? 'text-primary' : 'text-gray-400'
                }`}>
                  {item.rank}
                </span>
                <span className="flex-1 text-[14px] text-gray-800">{item.text}</span>
                {item.hot && (
                  <span className="px-1 py-0.5 bg-primary text-white text-[10px] rounded">热</span>
                )}
                <span className="text-[12px] text-gray-400">{item.count}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  )
}

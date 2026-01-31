import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Icon, CardMasonry, Badge, ImageSwap } from '@/components'
import { ProductListSkeleton, EmptyState, NetworkError } from '@/components/feedback'
import { productApi } from '@/api/products'
import { toast } from '@/store'
import { ProductCard, ProductStatus } from '@/types'

// 主导航
const mainTabs = ['关注', '最近', '热门']

// 风格标签
const styles = ['全部', '梦幻', '简约', '复古', '街头', '优雅', '甜酷']

const statusConfig: Record<ProductStatus, { text: string; variant: 'wishing' | 'making' | 'owned' | 'shipping' }> = {
  wishing: { text: '等人一起', variant: 'wishing' },
  making: { text: '制作中', variant: 'making' },
  shipping: { text: '运输中', variant: 'shipping' },
  owned: { text: '已实现', variant: 'owned' },
}

export function ExplorePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(1)
  const [activeStyle, setActiveStyle] = useState(0)
  const [products, setProducts] = useState<ProductCard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)


  // 获取商品列表
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(false)
      try {
        const sortMap = ['newest', 'newest', 'popular'] as const
        const response = await productApi.getProducts({
          sortBy: sortMap[activeTab] as 'newest' | 'popular',
          tags: activeStyle > 0 ? [styles[activeStyle]] : undefined,
        })
        setProducts(response.items)
      } catch (err) {
        console.error('Failed to fetch products:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [activeTab, activeStyle])

  const handleLike = async (e: React.MouseEvent, product: ProductCard) => {
    e.stopPropagation()
    try {
      const result = await productApi.toggleLike(product.id)
      setProducts(prev =>
        prev.map(p =>
          p.id === product.id
            ? { ...p, isLiked: result.liked, likes: result.likes }
            : p
        )
      )
    } catch (err) {
      toast.error('操作失败')
    }
  }

  const handleRetry = () => {
    setActiveTab(activeTab) // Trigger refetch
  }

  return (
    <Layout>
      {/* Header */}
      <div className="header-main">
        <div className="header-main-inner">
          <h1 className="header-title">灵感</h1>
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
          <button onClick={() => navigate('/search')} className="header-btn">
            <Icon name="search" size={22} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <main className="content-masonry">
        {/* 风格标签 */}
        <div className="style-tags">
          {styles.map((style, index) => (
            <button
              key={style}
              onClick={() => setActiveStyle(index)}
              className={`style-tag ${
                index === activeStyle ? 'style-tag-active' : 'style-tag-inactive'
              }`}
            >
              {style}
            </button>
          ))}
        </div>

        {/* 加载状态 */}
        {loading && <ProductListSkeleton count={6} />}

        {/* 错误状态 */}
        {error && !loading && <NetworkError onRetry={handleRetry} />}

        {/* 空状态 */}
        {!loading && !error && products.length === 0 && (
          <EmptyState
            icon="explore"
            title="暂无内容"
            description="稍后再来看看吧"
          />
        )}

        {/* 设计卡片 */}
        {!loading && !error && products.length > 0 && (
          <>
            <CardMasonry
              columns={{ default: 2, sm: 2, md: 2, lg: 2 }}
              gap={6}
            >
              {products.map((product, index) => {
                const aspectRatios = ['aspect-card-1', 'aspect-card-2', 'aspect-card-3', 'aspect-card-4']
                const aspectRatio = aspectRatios[index % aspectRatios.length]
                const config = statusConfig[product.status]

                return (
                  <div
                    key={product.id}
                    onClick={() => navigate(`/group-buy/${product.id}`)}
                    className="card-masonry card-interactive"
                  >
                    {/* 图片区域 */}
                    <div className={`relative ${aspectRatio}`}>
                      <ImageSwap
                        mainImage={product.image}
                        thumbImage={product.thumbImage || product.image}
                        alt={product.name}
                        className="w-full h-full rounded-t-sm overflow-hidden"
                        thumbSize="md"
                      />
                      {/* 状态标签 */}
                      <div className="absolute top-1.5 left-1.5 z-10">
                        <Badge variant={config.variant} size="sm">
                          {config.text}
                        </Badge>
                      </div>
                    </div>
                    {/* 信息区域 */}
                    <div className="px-1.5 py-2">
                      <h3 className="text-[13px] font-semibold leading-tight line-clamp-2">{product.name}</h3>
                      <div className="flex items-center justify-between mt-1.5">
                        <div className="flex items-center gap-1 min-w-0">
                          {product.designer?.avatar && (
                            <img
                              src={product.designer.avatar}
                              alt={product.designer.name}
                              className="w-4 h-4 object-cover flex-shrink-0 rounded-full"
                            />
                          )}
                          <span className="text-[11px] text-gray-500 truncate">
                            {product.designer?.name || '设计师'}
                          </span>
                        </div>
                        <button
                          onClick={(e) => handleLike(e, product)}
                          className="flex items-center gap-0.5 flex-shrink-0"
                        >
                          <Icon
                            name="favorite"
                            size={12}
                            className={product.isLiked ? 'text-primary' : 'text-gray-400'}
                            filled={product.isLiked}
                          />
                          <span className="text-[11px] text-gray-400">{product.likes || 0}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardMasonry>

            {/* 底部提示 */}
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm">看到喜欢的？点击加入愿望</p>
              <p className="text-gray-400 text-sm">或者创作你自己的设计</p>
            </div>
          </>
        )}

        {/* 创作入口 FAB */}
        <div
          onClick={() => navigate('/design/editor')}
          className="fixed bottom-24 right-4 size-14 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center shadow-lg cursor-pointer active:scale-95 transition-transform z-40"
          style={{ boxShadow: '0 4px 20px rgba(255, 107, 107, 0.4)' }}
        >
          <span className="text-xl">✨</span>
        </div>
      </main>
    </Layout>
  )
}

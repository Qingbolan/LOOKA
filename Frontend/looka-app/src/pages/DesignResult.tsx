import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Icon, Button, Card, Badge } from '@/components'

const generatedDesigns = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800',
    selected: true,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800',
    selected: false,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800',
    selected: false,
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
    selected: false,
  },
]

const designSpecs = [
  { label: '风格', value: '赛博朋克' },
  { label: '面料', value: '真丝混纺' },
  { label: '场景', value: '正式场合' },
  { label: '预算', value: '¥1,000-2,000' },
]

export function DesignResultPage() {
  const navigate = useNavigate()
  const [selectedDesign, setSelectedDesign] = useState('1')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSaving, setIsSaving] = useState(false)

  const selectedImage = generatedDesigns.find(d => d.id === selectedDesign)?.image

  const handleSaveToCloset = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      navigate('/closet')
    }, 800)
  }

  return (
    <Layout showTabBar={false}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="flex items-center p-4 h-14 justify-between max-w-md mx-auto">
          <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-start">
            <Icon name="close" size={24} className="text-gray-900" />
          </button>
          <h1 className="text-[17px] font-bold tracking-tight flex-1 text-center">AI 设计结果</h1>
          <button
            onClick={() => navigate('/parameter-edit')}
            className="size-10 flex items-center justify-end"
          >
            <Icon name="tune" size={24} />
          </button>
        </div>
      </div>

      <div className="pb-36">
        {/* Main Design Preview */}
        <div className="relative aspect-[3/4] bg-gray-100">
          <img
            src={selectedImage}
            alt="Generated Design"
            className="w-full h-full object-cover"
          />
          {/* AI Badge */}
          <div className="absolute top-4 left-4">
            <Badge variant="primary">
              <Icon name="auto_awesome" size={12} className="inline mr-1" />
              AI 生成
            </Badge>
          </div>
          {/* Regenerate Button */}
          <button className="absolute top-4 right-4 size-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform">
            <Icon name="refresh" size={20} className="text-gray-700" />
          </button>
          {/* Navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {generatedDesigns.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setSelectedDesign(generatedDesigns[index].id)
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-4' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Design Thumbnails */}
        <div className="p-4">
          <div className="flex gap-3 overflow-x-auto hide-scrollbar">
            {generatedDesigns.map((design, index) => (
              <button
                key={design.id}
                onClick={() => {
                  setSelectedDesign(design.id)
                  setCurrentIndex(index)
                }}
                className={`flex-shrink-0 w-20 h-28 rounded overflow-hidden border-2 transition-all active:scale-95 ${
                  selectedDesign === design.id ? 'border-primary shadow-lg shadow-primary/20' : 'border-transparent'
                }`}
              >
                <img
                  src={design.image}
                  alt={`Design ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
            {/* Generate More Button */}
            <button className="flex-shrink-0 w-20 h-28 rounded border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 hover:border-primary/50 transition-colors">
              <Icon name="add" size={24} className="text-gray-400" />
              <span className="text-[10px] text-gray-400">更多</span>
            </button>
          </div>
        </div>

        {/* Design Specs */}
        <div className="px-4">
          <Card>
            <h3 className="font-bold text-[15px] mb-4 flex items-center gap-2">
              <Icon name="description" size={18} className="text-primary" />
              设计参数
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {designSpecs.map((spec) => (
                <div key={spec.label} className="bg-gray-50 rounded p-3">
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">
                    {spec.label}
                  </p>
                  <p className="text-sm font-medium">{spec.value}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/parameter-edit')}
              className="w-full mt-4 py-3 text-center text-sm text-primary font-medium border border-primary/20 rounded hover:bg-primary/5 transition-colors active:scale-[0.98]"
            >
              <Icon name="edit" size={16} className="inline mr-1" />
              调整参数重新生成
            </button>
          </Card>
        </div>

        {/* Production Info */}
        <div className="px-4 mt-4">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100">
            <div className="flex items-center gap-4">
              <div className="size-12 bg-green-100 rounded flex items-center justify-center">
                <Icon name="verified" size={24} className="text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-gray-900">可立即生产</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  此设计已通过 AI 可生产性检测，预计 5-7 天交付
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Estimated Price */}
        <div className="px-4 mt-4">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">预估价格</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-primary">¥1,280</span>
                  <span className="text-sm text-gray-400 line-through">¥1,890</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">拼团价</p>
                <p className="text-lg font-bold text-green-600">¥980</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-2xl border-t border-gray-100 max-w-md mx-auto z-50">
        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="md"
            icon="checkroom"
            onClick={() => navigate('/try-on')}
          >
            试穿
          </Button>
          <Button
            variant="secondary"
            size="md"
            icon={isSaving ? undefined : 'bookmark'}
            onClick={handleSaveToCloset}
            disabled={isSaving}
          >
            {isSaving ? '保存中...' : '收藏'}
          </Button>
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={() => navigate('/product/1')}
          >
            查看详情
          </Button>
        </div>
      </div>
    </Layout>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components'

// 功能场景卡片
const featureCards = [
  {
    id: 'describe',
    title: '描述想法',
    example: '我想要一条像星空一样的裙子',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=100',
      'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=100',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=100',
    ],
    gradient: 'from-violet-500/20 to-purple-600/20',
  },
  {
    id: 'inspiration',
    title: '上传灵感',
    example: '帮我做类似这张图的感觉',
    images: [
      'https://images.unsplash.com/photo-1485968579169-a6b12a6e05ff?w=100',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=100',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100',
    ],
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    id: 'remix',
    title: '改造衣柜',
    example: '帮我把这件改成更日常的版本',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=100',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=100',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=100',
    ],
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
]

export function CreatePage() {
  const navigate = useNavigate()
  const [isHolding, setIsHolding] = useState(false)

  const handleCardClick = (cardId: string) => {
    // 跳转到对话页面，带上场景参数
    navigate(`/chat?mode=${cardId}`)
  }

  const handleCameraClick = () => {
    // 打开相机/相册
    navigate('/chat?mode=inspiration')
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#1a1a1a]/90 backdrop-blur-xl">
        <div className="flex items-center p-4 h-14 justify-between max-w-md mx-auto">
          <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center">
            <Icon name="close" size={24} className="text-white/70" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-pink-400 flex items-center justify-center">
              <Icon name="auto_awesome" size={12} className="text-white" />
            </div>
            <span className="font-bold">Luka</span>
          </div>
          <button className="size-10 flex items-center justify-center">
            <Icon name="more_horiz" size={24} className="text-white/70" />
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pb-32">
        {/* Luka 自我介绍 */}
        <div className="py-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6">
            <p className="text-[15px] leading-relaxed">
              Hi，我是 <span className="text-primary font-medium">Luka</span>，帮你把脑海里的衣服变成真的。
              <br /><br />
              告诉我你想要什么，或者发张图给我看看，我来帮你实现～
            </p>
          </div>

          {/* 功能卡片 */}
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {featureCards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`flex-shrink-0 w-40 bg-gradient-to-br ${card.gradient} backdrop-blur-sm rounded-2xl p-4 text-left transition-transform active:scale-95`}
              >
                <h3 className="font-bold text-[15px] mb-1">{card.title}</h3>
                <p className="text-[12px] text-white/60 mb-3 line-clamp-2">{card.example}</p>
                <div className="flex -space-x-2">
                  {card.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-lg bg-cover bg-center border-2 border-[#1a1a1a]"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 历史对话预览 */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm text-white/40">最近</h3>
            <button className="text-xs text-white/40">查看全部</button>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => navigate('/chat?history=1')}
              className="w-full flex items-center gap-3 p-3 bg-white/5 rounded-xl text-left hover:bg-white/10 transition-colors"
            >
              <div
                className="w-12 h-12 rounded-xl bg-cover bg-center flex-shrink-0"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=100)' }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">星空渐变长裙</p>
                <p className="text-xs text-white/40 truncate">已生成 3 个方案</p>
              </div>
              <Icon name="chevron_right" size={20} className="text-white/30" />
            </button>
            <button
              onClick={() => navigate('/chat?history=2')}
              className="w-full flex items-center gap-3 p-3 bg-white/5 rounded-xl text-left hover:bg-white/10 transition-colors"
            >
              <div
                className="w-12 h-12 rounded-xl bg-cover bg-center flex-shrink-0"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558171813-4c088753af8f?w=100)' }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">复古和服外套</p>
                <p className="text-xs text-white/40 truncate">制作中</p>
              </div>
              <Icon name="chevron_right" size={20} className="text-white/30" />
            </button>
          </div>
        </div>
      </div>

      {/* 底部输入区 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a] to-transparent pt-8">
        <div className="max-w-md mx-auto px-4 pb-24">
          <div className="flex items-center gap-3">
            {/* 表情/更多 */}
            <button className="size-11 flex items-center justify-center rounded-full bg-white/10">
              <Icon name="emoji_emotions" size={22} className="text-white/60" />
            </button>

            {/* 语音输入按钮 */}
            <button
              onTouchStart={() => setIsHolding(true)}
              onTouchEnd={() => setIsHolding(false)}
              onMouseDown={() => setIsHolding(true)}
              onMouseUp={() => setIsHolding(false)}
              onMouseLeave={() => setIsHolding(false)}
              className={`flex-1 h-11 rounded-full flex items-center justify-center transition-all ${
                isHolding
                  ? 'bg-primary text-white scale-105'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              <span className="text-sm">
                {isHolding ? '松开发送' : '按住说话'}
              </span>
            </button>

            {/* 相机 */}
            <button
              onClick={handleCameraClick}
              className="size-11 flex items-center justify-center rounded-full bg-white/10"
            >
              <Icon name="photo_camera" size={22} className="text-white/60" />
            </button>
          </div>

          {/* 提示文字 */}
          <p className="text-center text-[10px] text-white/30 mt-3">
            内容由 AI 生成
          </p>
        </div>
      </div>
    </div>
  )
}

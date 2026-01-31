import { useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Icon, LukaAvatar } from '@/components'

interface Message {
  id: string
  from: 'luka' | 'user'
  content: string
  image?: string
  options?: string[]
  isGenerating?: boolean
  designs?: { id: string; image: string }[]
}

const modeGreetings: Record<string, string> = {
  describe: '好的，告诉我你想要什么样的衣服？',
  inspiration: '发张图给我看看，我来帮你做类似的~',
  remix: '选一件衣柜里的衣服，告诉我你想怎么改~',
}

// 模拟历史对话数据
const historyConversations: Record<string, Message[]> = {
  '1': [
    { id: '1', from: 'luka', content: '想做什么样的衣服呢？' },
    { id: '2', from: 'user', content: '我想要一条像星空一样的裙子，有渐变的感觉' },
    { id: '3', from: 'luka', content: '想要什么风格的呢？', options: ['仙女飘逸', '日常简约', '复古优雅', '甜酷混搭'] },
    { id: '4', from: 'user', content: '仙女飘逸' },
    { id: '5', from: 'luka', content: '给你生成了几个方向，点击看大图~', designs: [
      { id: '1', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400' },
      { id: '2', image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400' },
      { id: '3', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400' },
    ]},
  ],
  '2': [
    { id: '1', from: 'luka', content: '想做什么样的衣服呢？' },
    { id: '2', from: 'user', content: '帮我做一件复古和服外套' },
    { id: '3', from: 'luka', content: '好的～给你生成了几个方案', designs: [
      { id: '4', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400' },
      { id: '5', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400' },
    ]},
    { id: '4', from: 'user', content: '第一个不错，我要这个' },
    { id: '5', from: 'luka', content: '太好了！已经帮你发起愿望啦，等更多人一起就可以开始制作了～ 🎉' },
  ],
}

export function LukaChatPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode') || 'describe'
  const historyId = searchParams.get('history')
  const initialQuery = searchParams.get('q')

  // 根据是否有 history 参数决定初始消息
  const getInitialMessages = (): Message[] => {
    if (historyId && historyConversations[historyId]) {
      return historyConversations[historyId]
    }

    const messages: Message[] = [
      {
        id: '1',
        from: 'luka',
        content: modeGreetings[mode] || '想做什么样的衣服呢？',
      },
    ]

    // 如果有初始查询，添加用户消息
    if (initialQuery) {
      messages.push({
        id: '2',
        from: 'user',
        content: initialQuery,
      })
    }

    return messages
  }

  const [messages, setMessages] = useState<Message[]>(getInitialMessages())
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 安全返回 - 如果没有历史记录则回到 /luka
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/luka')
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = (content: string, image?: string) => {
    if (!content.trim() && !image) return

    const userMessage: Message = {
      id: Date.now().toString(),
      from: 'user',
      content: content.trim(),
      image,
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Luka 回复逻辑
    setTimeout(() => {
      setIsTyping(false)

      const hasStyle = ['简约', '复古', '甜美', '酷', '优雅', '仙', '日常'].some(s => content.includes(s))

      if (hasStyle || image) {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          from: 'luka',
          content: '明白了～让我想想...',
          isGenerating: true,
        }])

        setTimeout(() => {
          setMessages(prev => {
            const newMessages = [...prev]
            const lastIndex = newMessages.length - 1
            newMessages[lastIndex] = {
              ...newMessages[lastIndex],
              content: '给你生成了几个方向，点击看大图~',
              isGenerating: false,
              designs: [
                { id: '1', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400' },
                { id: '2', image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400' },
                { id: '3', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400' },
              ],
            }
            return newMessages
          })
        }, 2500)
      } else if (content.includes('裙') || content.includes('衣') || content.includes('裤')) {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          from: 'luka',
          content: '想要什么风格的呢？',
          options: ['仙女飘逸', '日常简约', '复古优雅', '甜酷混搭'],
        }])
      } else {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          from: 'luka',
          content: '可以再具体一点吗？比如什么场合穿、喜欢什么颜色和风格？',
        }])
      }
    }, 800)
  }

  const handleImageUpload = () => {
    sendMessage('帮我做类似这种感觉的', 'https://images.unsplash.com/photo-1485968579169-a6b12a6e05ff?w=400')
  }

  const handleDesignClick = (designId: string) => {
    navigate(`/design-result?id=${designId}`)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="flex items-center p-4 h-14 justify-between max-w-md mx-auto">
          <button onClick={handleBack} className="size-10 flex items-center justify-center">
            <Icon name="arrow_back_ios" size={20} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <LukaAvatar size="xs" />
            <span className="font-medium">Luka</span>
          </div>
          <button className="size-10 flex items-center justify-center">
            <Icon name="more_horiz" size={24} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* 对话区域 */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-md mx-auto px-4 py-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.from === 'luka' && (
                <LukaAvatar size="sm" className="mr-2 mt-1" />
              )}

              <div className="max-w-[80%]">
                {message.image && (
                  <div className="mb-2 rounded overflow-hidden">
                    <img src={message.image} alt="" className="w-48 h-48 object-cover" />
                  </div>
                )}

                <div
                  className={`px-4 py-3 rounded ${
                    message.from === 'user'
                      ? 'bg-primary text-white rounded-br-sm'
                      : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100'
                  }`}
                >
                  {message.isGenerating ? (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      <span className="text-sm text-gray-600">生成中...</span>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  )}
                </div>

                {message.options && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => sendMessage(option)}
                        className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded-full hover:bg-gray-50 hover:border-primary/30 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {message.designs && (
                  <div className="flex gap-2 mt-3">
                    {message.designs.map((design) => (
                      <button
                        key={design.id}
                        onClick={() => handleDesignClick(design.id)}
                        className="w-24 aspect-[3/4] rounded overflow-hidden ring-2 ring-transparent hover:ring-primary transition-all shadow-sm"
                      >
                        <img src={design.image} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start">
              <LukaAvatar size="sm" className="mr-2" />
              <div className="bg-white px-4 py-3 rounded rounded-bl-sm shadow-sm border border-gray-100">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 底部输入 */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-end gap-3">
            <button
              onClick={handleImageUpload}
              className="size-10 flex items-center justify-center rounded-full bg-gray-100 flex-shrink-0"
            >
              <Icon name="add_photo_alternate" size={20} className="text-gray-500" />
            </button>

            <div className="flex-1 bg-gray-100 rounded px-4 py-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage(input)
                  }
                }}
                placeholder="描述你想要的..."
                rows={1}
                className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 resize-none outline-none"
              />
            </div>

            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className={`size-10 flex items-center justify-center rounded-full flex-shrink-0 transition-all ${
                input.trim()
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              <Icon name="send" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

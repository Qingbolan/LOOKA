import { useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Icon } from '@/components'

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

export function ChatPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode') || 'describe'

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      from: 'luka',
      content: modeGreetings[mode] || '想做什么样的衣服呢？',
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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

      // 简化的对话逻辑
      const hasStyle = ['简约', '复古', '甜美', '酷', '优雅', '仙', '日常'].some(s => content.includes(s))

      if (hasStyle || image) {
        // 开始生成
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
    <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#1a1a1a]/90 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center p-4 h-14 justify-between max-w-md mx-auto">
          <button onClick={() => navigate('/create')} className="size-10 flex items-center justify-center">
            <Icon name="arrow_back_ios" size={20} className="text-white/70" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-pink-400 flex items-center justify-center">
              <Icon name="auto_awesome" size={14} className="text-white" />
            </div>
            <span className="font-medium">Luka</span>
          </div>
          <button className="size-10 flex items-center justify-center">
            <Icon name="more_horiz" size={24} className="text-white/70" />
          </button>
        </div>
      </div>

      {/* 对话区域 */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 py-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.from === 'luka' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-pink-400 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                  <Icon name="auto_awesome" size={14} className="text-white" />
                </div>
              )}

              <div className="max-w-[80%]">
                {message.image && (
                  <div className="mb-2 rounded-2xl overflow-hidden">
                    <img src={message.image} alt="" className="w-48 h-48 object-cover" />
                  </div>
                )}

                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.from === 'user'
                      ? 'bg-primary text-white rounded-br-sm'
                      : 'bg-white/10 text-white rounded-bl-sm'
                  }`}
                >
                  {message.isGenerating ? (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="text-sm">生成中...</span>
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
                        className="px-4 py-2 bg-white/10 border border-white/20 text-white text-sm rounded-full hover:bg-white/20 transition-colors"
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
                        className="w-24 aspect-[3/4] rounded-xl overflow-hidden ring-2 ring-transparent hover:ring-primary transition-all"
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
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-pink-400 flex items-center justify-center mr-2">
                <Icon name="auto_awesome" size={14} className="text-white" />
              </div>
              <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 底部输入 */}
      <div className="sticky bottom-0 bg-[#1a1a1a] border-t border-white/10">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-end gap-3">
            <button
              onClick={handleImageUpload}
              className="size-10 flex items-center justify-center rounded-full bg-white/10 flex-shrink-0"
            >
              <Icon name="add_photo_alternate" size={20} className="text-white/60" />
            </button>

            <div className="flex-1 bg-white/10 rounded-2xl px-4 py-2">
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
                className="w-full bg-transparent text-sm text-white placeholder-white/40 resize-none outline-none"
              />
            </div>

            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className={`size-10 flex items-center justify-center rounded-full flex-shrink-0 transition-all ${
                input.trim()
                  ? 'bg-primary text-white'
                  : 'bg-white/10 text-white/40'
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

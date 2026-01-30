import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Icon, Button, Card } from '@/components'

const scenarios = [
  { id: 'work', label: '通勤', icon: 'work' },
  { id: 'daily', label: '日常', icon: 'sunny' },
  { id: 'sport', label: '运动', icon: 'fitness_center' },
  { id: 'formal', label: '正式', icon: 'celebration' },
  { id: 'party', label: '派对', icon: 'nightlife' },
]

const styleIntensity = ['保守', '经典', '时尚', '前卫', '大胆']

export function CreatePage() {
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState('')
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null)
  const [budget, setBudget] = useState(1000)
  const [intensity, setIntensity] = useState(2)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false)
      navigate('/design-result')
    }, 1500)
  }

  return (
    <Layout>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="flex items-center p-4 h-14 justify-between max-w-md mx-auto">
          <div className="w-10" />
          <h1 className="text-[17px] font-bold tracking-tight text-center">创作设计</h1>
          <button className="w-10 flex items-center justify-end">
            <Icon name="history" size={22} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 pb-44 space-y-4">
        {/* Prompt Input */}
        <Card>
          <h3 className="font-bold text-[15px] mb-3 flex items-center gap-2">
            <Icon name="edit" size={18} className="text-primary" />
            描述你的想法
          </h3>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="描述你想要的服装风格，比如：一件适合春季办公室穿的简约针织衫，浅灰色，带有小V领..."
            className="w-full h-24 bg-gray-50 rounded-2xl p-4 text-sm resize-none outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
          />
          <div className="flex gap-2 mt-3">
            <button className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-xs text-gray-600 transition-colors">
              <Icon name="photo_camera" size={14} />
              上传图片
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-xs text-gray-600 transition-colors">
              <Icon name="mic" size={14} />
              语音输入
            </button>
          </div>
        </Card>

        {/* Scenario Selection */}
        <Card>
          <h3 className="font-bold text-[15px] mb-3 flex items-center gap-2">
            <Icon name="category" size={18} className="text-primary" />
            适用场景
          </h3>
          <div className="flex gap-2 flex-wrap">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all active:scale-95 ${
                  selectedScenario === scenario.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon name={scenario.icon} size={18} />
                <span className="text-sm font-medium">{scenario.label}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Budget */}
        <Card>
          <h3 className="font-bold text-[15px] mb-3 flex items-center gap-2">
            <Icon name="payments" size={18} className="text-primary" />
            预算范围
          </h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-primary">¥{budget}</span>
            <span className="text-sm text-gray-400">以内</span>
          </div>
          <input
            type="range"
            min="200"
            max="5000"
            step="100"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                       [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary/30
                       [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:active:scale-110"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>¥200</span>
            <span>¥5000</span>
          </div>
        </Card>

        {/* Style Intensity */}
        <Card>
          <h3 className="font-bold text-[15px] mb-3 flex items-center gap-2">
            <Icon name="tune" size={18} className="text-primary" />
            风格强度
          </h3>
          <div className="flex justify-between mb-3">
            {styleIntensity.map((label, index) => (
              <button
                key={label}
                onClick={() => setIntensity(index)}
                className={`text-xs font-medium px-2 py-1 rounded-full transition-all ${
                  index === intensity ? 'text-primary bg-primary/10' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-300"
              style={{ width: `${((intensity + 1) / styleIntensity.length) * 100}%` }}
            />
          </div>
        </Card>

        {/* Advanced Options */}
        <button
          onClick={() => navigate('/parameter-edit')}
          className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors"
        >
          <span className="text-sm font-medium">更多高级选项</span>
          <Icon name="chevron_right" size={20} className="text-gray-400" />
        </button>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-white/0 max-w-md mx-auto z-40">
        <Button
          fullWidth
          icon={isGenerating ? undefined : 'auto_awesome'}
          size="lg"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              AI 生成中...
            </span>
          ) : (
            '开始 AI 设计'
          )}
        </Button>
      </div>
    </Layout>
  )
}

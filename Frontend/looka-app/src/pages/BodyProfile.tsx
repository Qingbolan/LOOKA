import { useNavigate } from 'react-router-dom'
import { Layout, Icon } from '@/components'

export function BodyProfilePage() {
  const navigate = useNavigate()

  return (
    <Layout showTabBar={false}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl">
        <div className="flex items-center px-4 h-14 justify-between max-w-md mx-auto">
          <button onClick={() => navigate(-1)} className="w-10 flex items-center justify-start">
            <Icon name="arrow_back_ios" size={22} />
          </button>
          <h1 className="text-[17px] font-semibold tracking-tight text-center">AI 身材档案设置</h1>
          <button className="w-10 flex items-center justify-end">
            <span className="text-gray-400 text-[15px]">跳过</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-6 pt-6 pb-40">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-[24px] font-bold tracking-tight mb-2">请上传一张正面全身照</h2>
          <p className="text-gray-400 text-[14px]">我们将为您生成专属的 3D 试穿模型</p>
        </div>

        {/* Upload Area */}
        <div className="relative mb-10">
          <div className="w-full aspect-[3/4] bg-gray-50/50 rounded-[32px] border-2 border-dashed border-pink-200 flex flex-col items-center justify-center cursor-pointer active:scale-[0.99] transition-transform">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center mb-4">
                <Icon name="photo_camera" size={32} className="text-pink-400" />
              </div>
              <span className="text-[17px] font-medium mb-1">点击上传或拍摄</span>
              <span className="text-[13px] text-gray-400">正面、全身、且清晰可见</span>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-bold">拍照要点</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Tip 1 */}
            <div className="space-y-3">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100 ring-1 ring-black/5">
                <img
                  src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400"
                  alt="Good lighting example"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-0.5 shadow-sm">
                  <Icon name="check" size={14} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="light_mode" size={18} className="text-pink-400" />
                <span className="text-[13px] font-medium">光线充足</span>
              </div>
            </div>

            {/* Tip 2 */}
            <div className="space-y-3">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100 ring-1 ring-black/5">
                <img
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400"
                  alt="Straight pose example"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-0.5 shadow-sm">
                  <Icon name="check" size={14} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="accessibility_new" size={18} className="text-pink-400" />
                <span className="text-[13px] font-medium">站姿端正</span>
              </div>
            </div>
          </div>

          {/* Notice */}
          <div className="bg-pink-50/40 border border-pink-100 rounded-3xl p-4">
            <div className="flex items-start gap-3">
              <Icon name="info" size={18} className="text-pink-400 mt-0.5" />
              <p className="text-[13px] text-gray-700 leading-relaxed">
                温馨提示：请穿着<span className="font-bold">修身衣物</span>，以便 AI 更准确地识别您的身材线条，获得更真实的试穿效果。
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-2xl border-t border-gray-100 max-w-md mx-auto z-50">
        <button
          onClick={() => navigate('/try-on')}
          className="w-full flex items-center justify-center bg-pink-400 text-white rounded-full h-14 font-bold text-[17px] shadow-lg shadow-pink-400/20 active:opacity-90 transition-opacity"
        >
          开始 AI 建模
        </button>
        <div className="mt-4 text-center">
          <p className="text-[12px] text-gray-400">
            <Icon name="verified_user" size={12} className="inline mr-1" />
            我们将保护您的隐私，照片仅用于身材建模
          </p>
        </div>
      </div>
    </Layout>
  )
}

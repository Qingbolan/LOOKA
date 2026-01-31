import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDesignStore } from '@/store';
import { DesignParameters, ReferenceImage } from '@/types';
import { RecipeCard } from '@/components/design/RecipeCard';
import { VersionSelector } from '@/components/design/VersionTimeline';
import { ShareButton } from '@/components/social/ShareSheet';

export default function DesignEditorPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const remixId = searchParams.get('remix');

  const {
    currentDesign,
    currentVersion,
    createDesign,
    saveDraft,
    createVersion,
    switchVersion,
    remixDesign,
    clearCurrentDesign,
  } = useDesignStore();
  const [prompt, setPrompt] = useState('');
  const [parameters, setParameters] = useState<DesignParameters>({
    style: '',
    fabric: '',
    scenario: '',
    budget: { min: 200, max: 800 },
    fit: '',
    intensity: 50,
  });
  const [references, setReferences] = useState<ReferenceImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  // 初始化
  useEffect(() => {
    if (remixId) {
      remixDesign(remixId);
    }
  }, [remixId, remixDesign]);

  // 同步当前版本数据
  useEffect(() => {
    if (currentVersion) {
      setPrompt(currentVersion.recipe.prompt);
      setParameters(currentVersion.recipe.parameters);
      setReferences(currentVersion.recipe.references);
      setGeneratedImages(currentVersion.images);
    }
  }, [currentVersion]);

  // 生成设计
  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    // 模拟 AI 生成
    await new Promise((r) => setTimeout(r, 2000));

    const mockImages = [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
    ];

    setGeneratedImages(mockImages);
    setIsGenerating(false);

    // 如果没有当前设计，创建新设计
    if (!currentDesign) {
      await createDesign('我的设计', prompt, parameters, references);
    } else {
      // 创建新版本
      await createVersion({
        id: Math.random().toString(36).substring(2, 15),
        prompt,
        parameters,
        references,
        createdAt: new Date().toISOString(),
      });
    }
  };

  // 保存草稿
  const handleSaveDraft = async () => {
    if (!currentDesign && prompt.trim()) {
      await createDesign('未命名设计', prompt, parameters, references);
    }
    await saveDraft();
  };

  // 发起愿望
  const handleCreateWish = () => {
    if (!currentDesign) return;
    navigate('/wish/create', { state: { designId: currentDesign.id } });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="header-detail">
        <div className="header-detail-inner">
          <button
            onClick={() => {
              clearCurrentDesign();
              navigate(-1);
            }}
            className="header-btn-start"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="header-title-center">
            {currentDesign ? '编辑设计' : '创作设计'}
          </h1>
          <ShareButton onClick={() => {}} variant="icon" className="!bg-transparent" />
        </div>
      </header>

      {/* 主内容 */}
      <div className="flex-1 overflow-y-auto">
        <div className="content-page pb-32">
          {/* 版本切换 */}
          {currentDesign && currentDesign.versions.length > 1 && (
            <div className="flex items-center justify-center py-3">
              <VersionSelector
                versions={currentDesign.versions}
                currentVersionId={currentVersion?.id || ''}
                onSelectVersion={switchVersion}
              />
            </div>
          )}

          {/* 生成结果 */}
          {generatedImages.length > 0 && (
            <div className="px-2 mb-4">
              <div className="grid grid-cols-2 gap-2">
                {generatedImages.map((img, index) => (
                  <div
                    key={index}
                    className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100"
                  >
                    <img
                      src={img}
                      alt={`生成结果 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 生成中状态 */}
          {isGenerating && (
            <div className="px-2 mb-4">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 flex flex-col items-center justify-center">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                  <span className="text-3xl">✨</span>
                </div>
                <p className="text-gray-600 mt-4 font-medium">Luka 正在创作...</p>
                <p className="text-gray-400 text-sm mt-1">让灵感变成现实</p>
              </div>
            </div>
          )}

          {/* 配方编辑区 */}
          <div className="px-2">
            {/* 设计描述 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900 mb-2 px-2">
                描述你想要的设计
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="例如：一件适合秋天约会穿的法式碎花连衣裙，要有点复古的感觉..."
                className="w-full h-28 p-4 rounded-xl bg-gray-50 border border-gray-100 text-sm resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* 快速标签 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900 mb-2 px-2">
                风格
              </label>
              <div className="flex flex-wrap gap-2 px-2">
                {['极简', '法式', '复古', '街头', '学院', '优雅'].map((style) => (
                  <button
                    key={style}
                    onClick={() =>
                      setParameters((p) => ({
                        ...p,
                        style: p.style === style ? '' : style,
                      }))
                    }
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      parameters.style === style
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* 面料 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900 mb-2 px-2">
                面料偏好
              </label>
              <div className="flex flex-wrap gap-2 px-2">
                {['棉', '亚麻', '丝绸', '针织', '牛仔'].map((fabric) => (
                  <button
                    key={fabric}
                    onClick={() =>
                      setParameters((p) => ({
                        ...p,
                        fabric: p.fabric === fabric ? '' : fabric,
                      }))
                    }
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      parameters.fabric === fabric
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {fabric}
                  </button>
                ))}
              </div>
            </div>

            {/* 场景 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900 mb-2 px-2">
                穿着场景
              </label>
              <div className="flex flex-wrap gap-2 px-2">
                {['日常', '约会', '通勤', '度假', '派对'].map((scenario) => (
                  <button
                    key={scenario}
                    onClick={() =>
                      setParameters((p) => ({
                        ...p,
                        scenario: p.scenario === scenario ? '' : scenario,
                      }))
                    }
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      parameters.scenario === scenario
                        ? 'bg-sky-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {scenario}
                  </button>
                ))}
              </div>
            </div>

            {/* 预算范围 */}
            <div className="mb-4 px-2">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                预算范围
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    ¥
                  </span>
                  <input
                    type="number"
                    value={parameters.budget.min}
                    onChange={(e) =>
                      setParameters((p) => ({
                        ...p,
                        budget: { ...p.budget, min: Number(e.target.value) },
                      }))
                    }
                    className="w-full pl-7 pr-3 py-2 rounded-lg bg-gray-50 border border-gray-100 text-sm"
                  />
                </div>
                <span className="text-gray-400">—</span>
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    ¥
                  </span>
                  <input
                    type="number"
                    value={parameters.budget.max}
                    onChange={(e) =>
                      setParameters((p) => ({
                        ...p,
                        budget: { ...p.budget, max: Number(e.target.value) },
                      }))
                    }
                    className="w-full pl-7 pr-3 py-2 rounded-lg bg-gray-50 border border-gray-100 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* 当前配方预览 */}
            {currentVersion && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-900 mb-2 px-2">
                  当前配方
                </label>
                <RecipeCard recipe={currentVersion.recipe} showDetails />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="bottom-action">
        <div className="bottom-action-inner">
          <div className="flex gap-3">
            <button
              onClick={handleSaveDraft}
              className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium"
            >
              存草稿
            </button>
            {generatedImages.length > 0 ? (
              <button
                onClick={handleCreateWish}
                className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold"
                style={{ boxShadow: '0 4px 14px rgba(255, 107, 107, 0.3)' }}
              >
                ✨ 发起愿望
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="flex-[2] py-3 rounded-xl bg-primary text-white font-bold disabled:opacity-50"
                style={{ boxShadow: '0 4px 14px rgba(255, 107, 107, 0.3)' }}
              >
                {isGenerating ? '生成中...' : '🎨 生成设计'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWishStore } from '@/store';
import { WishProgressTimeline } from '@/components/wish/WishProgressTimeline';
import { ParticipantFeed } from '@/components/wish/ParticipantFeed';
import { JoinWishButton } from '@/components/wish/JoinWishButton';
import { AvatarStack } from '@/components/wish/WishCard';
import { ShareSheet, ShareButton } from '@/components/social/ShareSheet';
import { EmotionalBadge } from '@/components/common/EmotionalBadge';

export default function WishDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    currentWishDetail,
    wishDetailLoading,
    activities,
    fetchWishDetail,
    postActivity,
    hasJoinedGroupBuy,
    joinGroupBuy,
    clearWishDetail,
  } = useWishStore();

  const [showShare, setShowShare] = useState(false);
  const [activeTab, setActiveTab] = useState<'story' | 'progress' | 'feed'>('story');

  useEffect(() => {
    if (id) {
      fetchWishDetail(id);
    }
    return () => clearWishDetail();
  }, [id, fetchWishDetail, clearWishDetail]);

  const handleJoin = () => {
    if (id) {
      joinGroupBuy(id, 'M', 'default');
    }
  };

  const handlePostComment = (content: string) => {
    if (id) {
      postActivity({ wishId: id, type: 'comment', content });
    }
  };

  if (wishDetailLoading || !currentWishDetail) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto animate-pulse">
            <span className="text-2xl">✨</span>
          </div>
          <p className="text-gray-500 mt-3">加载中...</p>
        </div>
      </div>
    );
  }

  const wish = currentWishDetail;
  const hasJoined = hasJoinedGroupBuy(wish.id);
  const remaining = wish.targetCount - wish.currentCount;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="header-detail">
        <div className="header-detail-inner">
          <button onClick={() => navigate(-1)} className="header-btn-start">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="header-title-center">愿望详情</h1>
          <ShareButton onClick={() => setShowShare(true)} variant="icon" className="!bg-transparent" />
        </div>
      </header>

      {/* 主内容 */}
      <div className="content-detail">
        {/* 商品图片 */}
        <div className="relative aspect-square">
          <img
            src={wish.product.image}
            alt={wish.product.name}
            className="w-full h-full object-cover"
          />
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {/* 底部信息 */}
          <div className="absolute bottom-4 left-4 right-4">
            <EmotionalBadge status="wishing" size="sm" />
            <h1 className="text-2xl font-bold text-white mt-2">{wish.product.name}</h1>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <AvatarStack avatars={wish.participantAvatars || []} size="sm" light />
                <span className="text-white/80 text-sm">{wish.currentCount} 人已加入</span>
              </div>
              <span className="text-white/60 text-sm">
                {formatRemainingTime(wish.remainingTime || 0)}
              </span>
            </div>
          </div>
        </div>

        {/* 进度概览 */}
        <div className="px-4 py-4 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">
              {remaining === 1 ? '🔥 只差最后一人！' : `还差 ${remaining} 人达成`}
            </span>
            <span className="text-primary font-bold">{wish.progress || 0}%</span>
          </div>
          <div className="h-2 bg-white rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
              style={{ width: `${wish.progress || 0}%` }}
            />
          </div>
        </div>

        {/* Tab 切换 */}
        <div className="sticky top-14 z-40 bg-white border-b border-gray-100">
          <div className="flex justify-center gap-8 px-4">
            {[
              { key: 'story', label: '故事' },
              { key: 'progress', label: '里程碑' },
              { key: 'feed', label: '动态' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`py-3 text-sm relative ${
                  activeTab === tab.key
                    ? 'font-bold text-gray-900'
                    : 'text-gray-400'
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 内容 */}
        <div className="px-4 py-4">
          {/* 故事 Tab */}
          {activeTab === 'story' && (
            <div className="space-y-6">
              {/* 愿望故事 */}
              {wish.story && (
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">
                      {wish.story.emotion === 'excited' && '🎉'}
                      {wish.story.emotion === 'hopeful' && '🌟'}
                      {wish.story.emotion === 'grateful' && '💕'}
                      {wish.story.emotion === 'dreamy' && '✨'}
                    </span>
                    <h3 className="font-bold text-gray-900">{wish.story.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {wish.story.content}
                  </p>
                </div>
              )}

              {/* 价格信息 */}
              <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl">
                <div>
                  <p className="text-xs text-gray-500">愿望达成价</p>
                  <p className="text-2xl font-bold text-primary mt-1">
                    ¥{wish.groupPrice}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">原价</p>
                  <p className="text-lg text-gray-400 line-through mt-1">
                    ¥{wish.originalPrice}
                  </p>
                </div>
                <div className="px-3 py-1.5 bg-red-50 rounded-full">
                  <span className="text-red-500 font-bold text-sm">
                    省 {wish.savingsPercent}%
                  </span>
                </div>
              </div>

              {/* 规则说明 */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">愿望规则</h3>
                <ul className="space-y-2">
                  {wish.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-primary">✓</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 生产预览入口 */}
              {wish.status === 'success' && (
                <button
                  onClick={() => navigate(`/production/${wish.id}`)}
                  className="w-full p-4 bg-emerald-50 rounded-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎉</span>
                    <div>
                      <p className="font-bold text-emerald-700">愿望达成！</p>
                      <p className="text-sm text-emerald-600">查看生产进度</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-emerald-600">
                    chevron_right
                  </span>
                </button>
              )}
            </div>
          )}

          {/* 里程碑 Tab */}
          {activeTab === 'progress' && (
            <WishProgressTimeline
              milestones={wish.emotionalMilestones}
              currentCount={wish.currentCount}
              targetCount={wish.targetCount}
              status={wish.status}
            />
          )}

          {/* 动态 Tab */}
          {activeTab === 'feed' && (
            <ParticipantFeed
              activities={activities}
              onPost={hasJoined ? handlePostComment : undefined}
            />
          )}
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 max-w-md mx-auto z-50">
        <div className="p-4 pb-safe">
          <JoinWishButton
            wishId={wish.id}
            status={wish.status}
            hasJoined={hasJoined}
            price={wish.groupPrice}
            originalPrice={wish.originalPrice}
            remaining={remaining}
            onJoin={handleJoin}
          />
        </div>
      </div>

      {/* 分享面板 */}
      <ShareSheet
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        title={wish.product.name}
        description={`还差 ${remaining} 人就能达成愿望！`}
        image={wish.product.image}
      />

      <style>{`
        .pb-safe {
          padding-bottom: max(16px, env(safe-area-inset-bottom));
        }
      `}</style>
    </div>
  );
}

// 格式化剩余时间
function formatRemainingTime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);

  if (days > 0) {
    return `剩余 ${days} 天`;
  }
  if (hours > 0) {
    return `剩余 ${hours} 小时`;
  }
  return '即将结束';
}

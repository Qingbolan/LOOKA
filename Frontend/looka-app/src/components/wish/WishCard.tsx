import { memo } from 'react';
import { WishCard as WishCardType } from '@/types';
import { useNavigate } from 'react-router-dom';

interface WishCardProps {
  wish: WishCardType;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export const WishCard = memo(function WishCard({ wish, variant = 'default', className = '' }: WishCardProps) {
  const navigate = useNavigate();
  const remaining = wish.targetCount - wish.currentCount;
  const isAlmostThere = wish.progress >= 80;
  const isUrgent = wish.remainingTime < 24 * 60 * 60; // 24小时内

  const handleClick = () => {
    navigate(`/wish/${wish.id}`);
  };

  if (variant === 'compact') {
    return (
      <div
        onClick={handleClick}
        className={`flex gap-3 p-3 bg-white rounded-lg border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform ${className}`}
      >
        <div className="size-16 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={wish.product.image}
            alt={wish.product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 text-sm line-clamp-1">
            {wish.product.name}
          </h3>
          <p className="text-primary text-xs mt-1">
            还差 {remaining} 人 · {getEmotionalProgress(wish.progress)}
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <AvatarStack avatars={wish.participantAvatars} size="sm" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div
        onClick={handleClick}
        className={`bg-white rounded-xl overflow-hidden border border-gray-100 shadow-card cursor-pointer active:scale-[0.98] transition-transform ${className}`}
      >
        {/* 图片区域 */}
        <div className="relative aspect-[4/3]">
          <img
            src={wish.product.image}
            alt={wish.product.name}
            className="w-full h-full object-cover"
          />
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {/* 状态标签 */}
          <div className="absolute top-3 left-3">
            {isAlmostThere && (
              <span className="px-2 py-1 rounded-full bg-primary text-white text-xs font-medium">
                🔥 即将达成
              </span>
            )}
          </div>
          {/* 底部信息 */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-bold text-white text-lg line-clamp-1">
              {wish.product.name}
            </h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-white/90 text-sm">
                ¥{wish.groupPrice}
                <span className="line-through text-white/50 ml-1 text-xs">
                  ¥{wish.originalPrice}
                </span>
              </span>
              <AvatarStack avatars={wish.participantAvatars} size="sm" light />
            </div>
          </div>
        </div>
        {/* 进度区域 */}
        <div className="p-3">
          <ProgressBar progress={wish.progress} showLabel />
          <p className="text-sm text-gray-600 mt-2 text-center">
            {getEmotionalMessage(remaining, wish.progress, isUrgent)}
          </p>
        </div>
      </div>
    );
  }

  // 默认卡片
  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-lg overflow-hidden border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform ${className}`}
    >
      {/* 图片 */}
      <div className="relative aspect-square">
        <img
          src={wish.product.image}
          alt={wish.product.name}
          className="w-full h-full object-cover"
        />
        {isAlmostThere && (
          <div className="absolute top-2 left-2">
            <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-medium">
              ✨ 快达成了
            </span>
          </div>
        )}
      </div>
      {/* 信息 */}
      <div className="p-3">
        <h3 className="font-medium text-gray-900 text-sm line-clamp-1">
          {wish.product.name}
        </h3>
        {/* 进度条 */}
        <ProgressBar progress={wish.progress} className="mt-2" />
        {/* 统计 */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-primary font-bold text-sm">¥{wish.groupPrice}</span>
          <span className="text-gray-400 text-xs">
            还差 {remaining} 人
          </span>
        </div>
        {/* 参与者 */}
        <div className="flex items-center justify-between mt-2">
          <AvatarStack avatars={wish.participantAvatars} size="xs" />
          {isUrgent && (
            <span className="text-red-500 text-[10px]">⏰ 即将结束</span>
          )}
        </div>
      </div>
    </div>
  );
})

// 进度条组件
interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  className?: string;
}

function ProgressBar({ progress, showLabel, className = '' }: ProgressBarProps) {
  const isAlmostThere = progress >= 80;

  return (
    <div className={className}>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isAlmostThere
              ? 'bg-gradient-to-r from-primary to-amber-400'
              : 'bg-primary'
          }`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-400">{progress}%</span>
          {isAlmostThere && (
            <span className="text-xs text-primary font-medium">🎉 快达成了！</span>
          )}
        </div>
      )}
    </div>
  );
}

// 头像堆叠组件
interface AvatarStackProps {
  avatars: string[];
  size?: 'xs' | 'sm' | 'md';
  light?: boolean;
  max?: number;
}

export function AvatarStack({
  avatars,
  size = 'sm',
  light = false,
  max = 4,
}: AvatarStackProps) {
  const sizeClass = {
    xs: 'size-5',
    sm: 'size-6',
    md: 'size-8',
  };
  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className="flex items-center -space-x-1.5">
      {displayAvatars.map((avatar, index) => (
        <div
          key={index}
          className={`${sizeClass[size]} rounded-full overflow-hidden border-2 ${
            light ? 'border-white/30' : 'border-white'
          }`}
        >
          <img
            src={avatar || `https://i.pravatar.cc/100?img=${index}`}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={`${sizeClass[size]} rounded-full flex items-center justify-center text-[10px] font-medium border-2 ${
            light
              ? 'bg-white/20 text-white border-white/30'
              : 'bg-gray-100 text-gray-500 border-white'
          }`}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}

// 情感化进度文案
function getEmotionalProgress(progress: number): string {
  if (progress >= 90) return '马上就要达成啦！';
  if (progress >= 80) return '再加把劲！';
  if (progress >= 50) return '已过半程';
  if (progress >= 30) return '逐渐升温';
  return '刚刚开始';
}

// 情感化消息
function getEmotionalMessage(remaining: number, progress: number, isUrgent: boolean): string {
  if (remaining === 1) return '✨ 只差你一个人就能达成了！';
  if (remaining === 2) return '🎉 还差2个人，一起来！';
  if (isUrgent && progress >= 80) return '⏰ 时间不多了，快加入吧！';
  if (progress >= 80) return `🔥 还差 ${remaining} 人，即将达成`;
  return `还差 ${remaining} 人一起，期待你的加入`;
}

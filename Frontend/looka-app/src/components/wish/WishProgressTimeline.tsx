import { WishMilestone, WishStatus } from '@/types';

interface WishProgressTimelineProps {
  milestones: WishMilestone[];
  currentCount: number;
  targetCount: number;
  status?: WishStatus;
  className?: string;
}

export function WishProgressTimeline({
  milestones,
  currentCount,
  targetCount,
  className = '',
}: WishProgressTimelineProps) {
  const progress = (currentCount / targetCount) * 100;
  const sortedMilestones = [...milestones].sort((a, b) => a.count - b.count);

  return (
    <div className={className}>
      {/* 主进度条 */}
      <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden mb-6">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
        {/* 里程碑标记 */}
        {sortedMilestones.map((milestone) => (
          <div
            key={milestone.id}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${(milestone.count / targetCount) * 100}%` }}
          >
            <div
              className={`size-4 rounded-full border-2 transition-colors ${
                milestone.reached
                  ? 'bg-primary border-primary'
                  : 'bg-white border-gray-300'
              }`}
            />
          </div>
        ))}
      </div>

      {/* 里程碑列表 */}
      <div className="space-y-3">
        {sortedMilestones.map((milestone, index) => {
          const isNext = !milestone.reached && (index === 0 || sortedMilestones[index - 1].reached);

          return (
            <div
              key={milestone.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                milestone.reached
                  ? 'bg-primary/5'
                  : isNext
                  ? 'bg-amber-50 border border-amber-100'
                  : 'bg-gray-50'
              }`}
            >
              {/* 图标 */}
              <div
                className={`size-10 rounded-full flex items-center justify-center text-lg ${
                  milestone.reached
                    ? 'bg-primary/10'
                    : isNext
                    ? 'bg-amber-100'
                    : 'bg-gray-100'
                }`}
              >
                {milestone.icon}
              </div>

              {/* 信息 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-medium ${
                      milestone.reached ? 'text-primary' : 'text-gray-900'
                    }`}
                  >
                    {milestone.title}
                  </span>
                  {milestone.reached && (
                    <span className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                      已达成
                    </span>
                  )}
                  {isNext && (
                    <span className="text-[10px] text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full animate-pulse">
                      下一目标
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {milestone.reached
                    ? `达成于 ${formatDate(milestone.reachedAt!)}`
                    : `还差 ${milestone.count - currentCount} 人`}
                </p>
                {milestone.reward && (
                  <p className="text-xs text-primary mt-1">
                    🎁 {milestone.reward}
                  </p>
                )}
              </div>

              {/* 人数 */}
              <div className="text-right">
                <span
                  className={`text-lg font-bold ${
                    milestone.reached ? 'text-primary' : 'text-gray-300'
                  }`}
                >
                  {milestone.count}
                </span>
                <span className="text-xs text-gray-400">人</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 最终目标 */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10">
          <span className="text-2xl">🎯</span>
          <span className="text-gray-700">
            目标 <span className="font-bold text-primary">{targetCount}</span> 人
          </span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-500">
            已有 <span className="font-medium">{currentCount}</span> 人
          </span>
        </div>
      </div>
    </div>
  );
}

// 紧凑进度指示器
interface CompactProgressProps {
  currentCount: number;
  targetCount: number;
  className?: string;
}

export function CompactProgress({
  currentCount,
  targetCount,
  className = '',
}: CompactProgressProps) {
  const progress = (currentCount / targetCount) * 100;
  const remaining = targetCount - currentCount;

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-500">
          {currentCount}/{targetCount} 人
        </span>
        <span className="text-xs text-primary font-medium">
          {remaining === 1
            ? '只差你一个！'
            : remaining <= 3
            ? `还差 ${remaining} 人`
            : `${Math.round(progress)}%`}
        </span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}

// 格式化日期
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
}

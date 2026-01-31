interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  animation?: 'shimmer' | 'pulse' | 'none';
}

export function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'shimmer',
}: SkeletonProps) {
  const baseClass = 'bg-gray-200 dark:bg-gray-700';

  const variantClasses = {
    text: 'rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
  };

  const animationClasses = {
    shimmer: 'shimmer',
    pulse: 'animate-pulse',
    none: '',
  };

  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={`
        ${baseClass}
        ${variantClasses[variant]}
        ${animationClasses[animation]}
        ${className}
      `}
      style={style}
    />
  );
}

// 商品卡片骨架屏
export function ProductCardSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="aspect-card-1 w-full" />
      <Skeleton className="h-4 w-3/4" variant="text" />
      <Skeleton className="h-4 w-1/2" variant="text" />
    </div>
  );
}

// 商品列表骨架屏
export function ProductListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

// 订单卡片骨架屏
export function OrderCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-4 space-y-3">
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-32" variant="text" />
        <Skeleton className="h-4 w-16" variant="text" />
      </div>
      <div className="flex gap-3">
        <Skeleton className="w-20 h-20 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-full" variant="text" />
          <Skeleton className="h-4 w-2/3" variant="text" />
        </div>
      </div>
      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        <Skeleton className="h-4 w-24" variant="text" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
    </div>
  );
}

// 订单列表骨架屏
export function OrderListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <OrderCardSkeleton key={index} />
      ))}
    </div>
  );
}

// 拼团卡片骨架屏
export function GroupBuyCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" variant="text" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16" variant="text" />
          <Skeleton className="h-4 w-12" variant="text" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" variant="text" />
          <Skeleton className="h-4 w-16" variant="text" />
        </div>
      </div>
    </div>
  );
}

// 拼团列表骨架屏
export function GroupBuyListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: count }).map((_, index) => (
        <GroupBuyCardSkeleton key={index} />
      ))}
    </div>
  );
}

// 地址卡片骨架屏
export function AddressCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-4 space-y-2">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-16" variant="text" />
        <Skeleton className="h-5 w-24" variant="text" />
      </div>
      <Skeleton className="h-4 w-full" variant="text" />
      <Skeleton className="h-4 w-2/3" variant="text" />
    </div>
  );
}

// 个人资料骨架屏
export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      {/* 头像区域 */}
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16" variant="circular" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-24" variant="text" />
          <Skeleton className="h-4 w-32" variant="text" />
        </div>
      </div>
      {/* 统计数据 */}
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="text-center space-y-1">
            <Skeleton className="h-6 w-12 mx-auto" variant="text" />
            <Skeleton className="h-4 w-8 mx-auto" variant="text" />
          </div>
        ))}
      </div>
    </div>
  );
}

// 通用列表项骨架屏
export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3">
      <Skeleton className="w-10 h-10 rounded-lg" />
      <div className="flex-1 space-y-1">
        <Skeleton className="h-4 w-32" variant="text" />
        <Skeleton className="h-3 w-24" variant="text" />
      </div>
      <Skeleton className="w-6 h-6 rounded" />
    </div>
  );
}

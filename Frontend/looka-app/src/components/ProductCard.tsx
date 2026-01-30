import { Icon } from './Icon'

interface ProductCardProps {
  image: string
  title: string
  price: number
  originalPrice?: number
  badge?: string
  isAI?: boolean
  onClick?: () => void
}

export function ProductCard({
  image,
  title,
  price,
  originalPrice,
  badge,
  isAI,
  onClick,
}: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div className="relative aspect-[3/4] bg-gray-100">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {isAI && (
          <div className="absolute top-2 right-2 bg-black/20 backdrop-blur-md rounded-full p-1.5">
            <Icon name="smart_toy" size={16} className="text-white" />
          </div>
        )}
        {badge && (
          <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-primary rounded-full">
            <span className="text-[10px] text-white font-bold">{badge}</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-[14px] font-bold leading-snug line-clamp-2 mb-2">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold">¥{price}</span>
          {originalPrice && (
            <span className="text-gray-400 text-xs line-through">¥{originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  )
}

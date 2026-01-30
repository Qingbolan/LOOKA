import { Icon } from './Icon'

interface LukaAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  animated?: boolean
}

const sizeClasses = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
}

const iconSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 26,
}

export function LukaAvatar({
  size = 'md',
  className = '',
  animated = false,
}: LukaAvatarProps) {
  return (
    <div
      className={`
        ${sizeClasses[size]}
        rounded-full flex items-center justify-center flex-shrink-0
        bg-primary
        ${animated ? 'animate-pulse-slow' : ''}
        ${className}
      `}
    >
      <Icon
        name="auto_awesome"
        size={iconSizes[size]}
        className="text-white"
      />
    </div>
  )
}

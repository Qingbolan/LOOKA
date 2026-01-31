import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'success' | 'warning' | 'info' | 'wishing' | 'making' | 'shipping' | 'owned'
  size?: 'sm' | 'md'
  dot?: boolean
  className?: string
}

const variantClasses = {
  primary: 'bg-primary text-white',
  success: 'bg-emerald-500 text-white',
  warning: 'bg-amber-500 text-white',
  info: 'bg-sky-500 text-white',
  // 状态徽章 - 不同状态不同颜色
  wishing: 'bg-primary text-white',
  making: 'bg-amber-500 text-white',
  shipping: 'bg-sky-500 text-white',
  owned: 'bg-emerald-500 text-white',
}

const sizeClasses = {
  sm: 'text-[10px] px-1.5 py-0.5',
  md: 'text-[11px] px-2 py-0.5',
}

const dotColors = {
  primary: 'bg-white',
  success: 'bg-white',
  warning: 'bg-white',
  info: 'bg-white',
  wishing: 'bg-white',
  making: 'bg-white',
  shipping: 'bg-white',
  owned: 'bg-white',
}

export function Badge({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  className = '',
}: BadgeProps) {
  return (
    <span className={`
      inline-flex items-center gap-1 font-medium rounded
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${className}
    `}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  )
}

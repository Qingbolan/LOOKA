import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'success' | 'warning' | 'info' | 'wishing' | 'making' | 'shipping' | 'owned'
  size?: 'sm' | 'md'
  dot?: boolean
  className?: string
}

const variantClasses = {
  primary: 'bg-primary/10 text-primary dark:bg-primary/20',
  success: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400',
  warning: 'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400',
  info: 'bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400',
  // 状态徽章 - 符合产品语义
  wishing: 'bg-primary/10 text-primary dark:bg-primary/20',
  making: 'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400',
  shipping: 'bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400',
  owned: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400',
}

const sizeClasses = {
  sm: 'text-[10px] px-2 py-0.5',
  md: 'text-[11px] px-2.5 py-1',
}

const dotColors = {
  primary: 'bg-primary',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  info: 'bg-sky-500',
  wishing: 'bg-primary',
  making: 'bg-amber-500',
  shipping: 'bg-sky-500',
  owned: 'bg-emerald-500',
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
      inline-flex items-center gap-1.5 font-bold tracking-wide rounded-full
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

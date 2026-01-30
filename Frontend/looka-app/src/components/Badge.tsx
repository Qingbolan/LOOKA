import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'success' | 'warning' | 'info'
  size?: 'sm' | 'md'
}

const variantClasses = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-green-50 text-green-600',
  warning: 'bg-amber-50 text-amber-600',
  info: 'bg-blue-50 text-blue-600',
}

const sizeClasses = {
  sm: 'text-[10px] px-2 py-0.5',
  md: 'text-[11px] px-2.5 py-0.5',
}

export function Badge({ children, variant = 'primary', size = 'md' }: BadgeProps) {
  return (
    <span className={`font-bold tracking-wider rounded-full ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  )
}

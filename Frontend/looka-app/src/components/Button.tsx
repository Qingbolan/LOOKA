import { ReactNode } from 'react'
import { Icon } from './Icon'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  fullWidth?: boolean
  onClick?: () => void
  disabled?: boolean
  className?: string
}

const variantClasses = {
  primary: 'bg-primary text-white shadow-button',
  secondary: 'bg-primary/5 text-primary border border-primary/10',
  ghost: 'bg-transparent text-gray-900',
}

const sizeClasses = {
  sm: 'h-10 px-4 text-[13px]',
  md: 'h-12 px-6 text-[14px]',
  lg: 'h-14 px-8 text-[15px]',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth = false,
  onClick,
  disabled = false,
  className = '',
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-full font-bold flex items-center justify-center gap-2
        active:scale-[0.98] transition-transform
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {icon && <Icon name={icon} size={size === 'sm' ? 18 : 20} />}
      {children}
    </button>
  )
}

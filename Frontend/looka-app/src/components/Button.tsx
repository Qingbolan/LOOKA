import { ReactNode } from 'react'
import { Icon } from './Icon'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'dream'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const variantClasses = {
  primary: 'bg-gradient-to-r from-primary to-pink-500 text-white shadow-button',
  secondary: 'bg-primary/10 text-primary border border-primary/20 dark:bg-primary/15 dark:border-primary/30',
  ghost: 'bg-transparent text-text-primary dark:text-text-dark-primary hover:bg-primary/10',
  dream: 'bg-gradient-to-r from-primary via-pink-500 to-primary text-white shadow-button animate-shimmer bg-[length:200%_100%]',
}

const sizeClasses = {
  sm: 'h-9 px-4 text-[13px] gap-1.5',
  md: 'h-11 px-5 text-[14px] gap-2',
  lg: 'h-13 px-7 text-[15px] gap-2.5',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  onClick,
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  const iconSize = size === 'sm' ? 16 : size === 'md' ? 18 : 20

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        rounded-full font-bold flex items-center justify-center
        active:scale-[0.98] transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <Icon name={icon} size={iconSize} />}
          {children}
          {icon && iconPosition === 'right' && <Icon name={icon} size={iconSize} />}
        </>
      )}
    </button>
  )
}

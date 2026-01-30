interface IconProps {
  name: string
  className?: string
  size?: number
  filled?: boolean
}

export function Icon({ name, className = '', size = 24, filled = false }: IconProps) {
  const fillClass = filled ? 'filled' : ''

  return (
    <span
      className={`material-symbols-outlined ${fillClass} ${className}`}
      style={{ fontSize: size }}
    >
      {name}
    </span>
  )
}

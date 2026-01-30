import { useNavigate } from 'react-router-dom'
import { Icon } from './Icon'

interface HeaderProps {
  title: string
  showBack?: boolean
  rightAction?: React.ReactNode
  transparent?: boolean
}

export function Header({ title, showBack = false, rightAction, transparent = false }: HeaderProps) {
  const navigate = useNavigate()

  return (
    <header
      className={`sticky top-0 z-50 border-b ${
        transparent
          ? 'bg-transparent border-transparent'
          : 'bg-white/90 backdrop-blur-xl border-gray-100'
      }`}
      style={{ paddingTop: 'var(--safe-area-inset-top)' }}
    >
      <div className="flex items-center p-4 h-16 justify-between max-w-md mx-auto">
        <div className="flex size-10 items-center justify-start">
          {showBack && (
            <button onClick={() => navigate(-1)}>
              <Icon name="arrow_back_ios" size={20} className="text-gray-900" />
            </button>
          )}
        </div>
        <h1 className="text-luxury-black text-[17px] font-bold tracking-tight flex-1 text-center font-display">
          {title}
        </h1>
        <div className="flex size-10 items-center justify-end">
          {rightAction}
        </div>
      </div>
    </header>
  )
}

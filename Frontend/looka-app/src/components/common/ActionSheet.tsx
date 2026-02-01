import { ReactNode, useEffect } from 'react'
import { Icon } from './Icon'

/**
 * ActionSheet 选项配置
 */
export interface ActionSheetOption {
  id: string
  icon?: string
  title: string
  subtitle?: string
  gradient?: string
  danger?: boolean
  onClick: () => void
}

/**
 * ActionSheet 组件属性
 */
interface ActionSheetProps {
  /** 是否显示 */
  open: boolean
  /** 关闭回调 */
  onClose: () => void
  /** 标题 */
  title?: string
  /** 选项列表 */
  options: ActionSheetOption[]
  /** 取消按钮文字 */
  cancelText?: string
  /** 是否显示取消按钮 */
  showCancel?: boolean
  /** 自定义内容（替代选项列表） */
  children?: ReactNode
}

/**
 * ActionSheet - 统一的底部弹窗组件
 *
 * 设计规范：
 * - 亚克力效果背景 (blur + saturate)
 * - 圆角顶部 28px
 * - 拖动指示器
 * - 统一的动画效果 (slide-up 0.35s)
 *
 * @example
 * ```tsx
 * <ActionSheet
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="选择操作"
 *   options={[
 *     { id: 'edit', icon: 'edit', title: '编辑', onClick: handleEdit },
 *     { id: 'delete', icon: 'delete', title: '删除', danger: true, onClick: handleDelete },
 *   ]}
 * />
 * ```
 */
export function ActionSheet({
  open,
  onClose,
  title,
  options,
  cancelText = '取消',
  showCancel = true,
  children,
}: ActionSheetProps) {
  // 禁止背景滚动
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 bg-black/40 z-[70] animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 底部面板 - 亚克力效果 */}
      <div
        className="fixed inset-x-0 bottom-0 z-[80] rounded-t-3xl animate-slide-up max-w-md mx-auto acrylic-strong pb-safe"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {/* 拖动指示器 */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-9 h-1 bg-black/10 dark:bg-white/20 rounded-full" />
        </div>

        {/* 标题 */}
        {title && (
          <div className="text-center py-3">
            <h3 className="text-md font-semibold text-text-primary tracking-tight">
              {title}
            </h3>
          </div>
        )}

        {/* 自定义内容或选项列表 */}
        {children ? (
          <div className="px-4 pb-3">{children}</div>
        ) : (
          <div className="px-4 pb-3 space-y-2">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  option.onClick()
                  onClose()
                }}
                className={`
                  w-full flex items-center gap-3.5 p-3.5 rounded-xl
                  surface-glass hover:bg-white/80 active:scale-[0.98]
                  transition-all shadow-sm
                  ${option.danger ? 'text-error' : ''}
                `}
              >
                {option.icon && (
                  <div
                    className={`
                      w-11 h-11 rounded-xl flex items-center justify-center
                      ${option.gradient
                        ? `bg-gradient-to-br ${option.gradient}`
                        : option.danger
                          ? 'bg-error/10'
                          : 'surface-inset'
                      }
                    `}
                  >
                    <Icon
                      name={option.icon}
                      size={22}
                      className={option.gradient ? 'text-white' : option.danger ? 'text-error' : 'text-gray-600 dark:text-gray-400'}
                    />
                  </div>
                )}
                <div className="flex-1 text-left">
                  <p className={`font-semibold text-base ${option.danger ? 'text-error' : 'text-text-primary'}`}>
                    {option.title}
                  </p>
                  {option.subtitle && (
                    <p className="text-sm text-text-tertiary mt-0.5">
                      {option.subtitle}
                    </p>
                  )}
                </div>
                <Icon name="chevron_right" size={18} className="text-text-muted" />
              </button>
            ))}
          </div>
        )}

        {/* 取消按钮 */}
        {showCancel && (
          <div className="px-4 pb-5 pt-1">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl surface-glass text-text-secondary font-medium hover:bg-white/70 active:scale-[0.98] transition-all"
            >
              {cancelText}
            </button>
          </div>
        )}
      </div>
    </>
  )
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // 使用 CSS 变量的颜色
        primary: {
          DEFAULT: "var(--color-primary)",
          light: "var(--color-primary-light)",
          dark: "var(--color-primary-dark)",
          soft: "var(--color-primary-soft)",
          // 保留色阶用于渐变
          50: "#FFF5F5",
          100: "#FFE3E3",
          200: "#FFC9C9",
          300: "#FFA8A8",
          400: "#FF8787",
          500: "#FF6B6B",
          600: "#FA5252",
          700: "#F03E3E",
          800: "#E03131",
          900: "#C92A2A",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
        },
        // 桃色辅助色
        peach: {
          DEFAULT: "var(--color-peach)",
          50: "#FFF8F5",
          100: "#FFEDE5",
          200: "#FFDDD0",
          300: "#FFC4AD",
          400: "#FFB59E",
          500: "#FFAB91",
          600: "#FF8A65",
        },
        // 语义色
        success: {
          DEFAULT: "var(--color-success)",
          light: "var(--color-success-light)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          light: "var(--color-warning-light)",
        },
        error: {
          DEFAULT: "var(--color-error)",
          light: "var(--color-error-light)",
        },
        info: {
          DEFAULT: "var(--color-info)",
          light: "var(--color-info-light)",
        },
        // 状态色
        status: {
          wishing: "var(--color-wishing)",
          making: "var(--color-making)",
          owned: "var(--color-owned)",
          shipping: "var(--color-shipping)",
        },
        // 背景色
        background: {
          DEFAULT: "var(--color-bg)",
          secondary: "var(--color-bg-secondary)",
          light: "#FFFAF8",
          dark: "#1A1A1A",
        },
        // 表面色
        surface: {
          DEFAULT: "var(--color-surface)",
          elevated: "var(--color-surface-elevated)",
          light: "#FFFFFF",
          dark: "#262626",
          "dark-elevated": "#2D2D2D",
        },
        // 文字色
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)",
          muted: "var(--color-text-muted)",
          "dark-primary": "#FFFFFF",
          "dark-secondary": "rgba(255,255,255,0.7)",
          "dark-muted": "rgba(255,255,255,0.4)",
        },
        // 边框色
        border: {
          DEFAULT: "var(--color-border)",
          light: "var(--color-border-light)",
        },
        divider: "var(--color-divider)",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "PingFang SC", "Noto Sans SC", "sans-serif"],
        body: ["Noto Sans SC", "PingFang SC", "sans-serif"],
      },
      // 使用 CSS 变量的间距
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
        'header': 'var(--header-height)',
        'header-detail': 'var(--header-height-detail)',
        'tabbar': 'var(--tabbar-height)',
        'safe-bottom': 'var(--safe-area-bottom)',
        'safe-top': 'var(--safe-area-top)',
        'card-gap': 'var(--spacing-card-gap)',
      },
      // 高度
      height: {
        'header': 'var(--header-height)',
        'header-detail': 'var(--header-height-detail)',
        'tabbar': 'var(--tabbar-height)',
        'bottom-action': 'var(--bottom-action-height)',
      },
      // 最大宽度
      maxWidth: {
        'app': 'var(--max-width)',
      },
      // 最小高度
      minHeight: {
        'header': 'var(--header-height)',
        'header-detail': 'var(--header-height-detail)',
      },
      // 定位
      inset: {
        'header': 'var(--header-height)',
        'header-detail': 'var(--header-height-detail)',
      },
      // 圆角 - 使用 CSS 变量
      borderRadius: {
        'sm': 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        'full': 'var(--radius-full)',
      },
      // 阴影 - 使用 CSS 变量
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'soft': '0 8px 30px rgba(0,0,0,0.04)',
        'card': 'var(--shadow-card)',
        'button': 'var(--shadow-button)',
      },
      // 卡片高度变体
      aspectRatio: {
        'card-1': '3/4',
        'card-2': '4/5',
        'card-3': '3/4.5',
        'card-4': '4/4.5',
      },
      // 动画
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 2s linear infinite',
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      // 过渡
      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
      },
      // Z-Index
      zIndex: {
        'base': 'var(--z-base)',
        'dropdown': 'var(--z-dropdown)',
        'sticky': 'var(--z-sticky)',
        'header': 'var(--z-header)',
        'modal': 'var(--z-modal)',
        'toast': 'var(--z-toast)',
      },
    },
  },
  plugins: [],
}

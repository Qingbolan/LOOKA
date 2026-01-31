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
        // 主色调：温暖珊瑚色
        primary: {
          DEFAULT: "#FF6B6B",
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
        // 桃色辅助色
        peach: {
          DEFAULT: "#FFAB91",
          50: "#FFF8F5",
          100: "#FFEDE5",
          200: "#FFDDD0",
          300: "#FFC4AD",
          400: "#FFB59E",
          500: "#FFAB91",
          600: "#FF8A65",
        },
        // 背景色
        background: {
          light: "#FFFAF8",
          DEFAULT: "#FFFAF8",
          dark: "#1A1A1A",
        },
        // 表面色
        surface: {
          light: "#FFFFFF",
          dark: "#262626",
          "dark-elevated": "#2D2D2D",
        },
        // 文字色
        text: {
          primary: "#1A1A1A",
          secondary: "#6B7280",
          muted: "#9CA3AF",
          "dark-primary": "#FFFFFF",
          "dark-secondary": "rgba(255,255,255,0.7)",
          "dark-muted": "rgba(255,255,255,0.4)",
        },
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "PingFang SC", "Noto Sans SC", "sans-serif"],
        body: ["Noto Sans SC", "PingFang SC", "sans-serif"],
      },
      // 使用 CSS 变量的间距
      spacing: {
        'header': 'var(--header-height)',
        'header-detail': 'var(--header-height-detail)',
        'tabbar': 'var(--tabbar-height)',
        'safe-bottom': 'var(--safe-area-inset-bottom)',
        'safe-top': 'var(--safe-area-inset-top)',
        'card-gap': '6px',
      },
      // 高度
      height: {
        'header': 'var(--header-height)',
        'header-detail': 'var(--header-height-detail)',
        'tabbar': 'var(--tabbar-height)',
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
      // 圆角
      borderRadius: {
        'sm': '4px',
        DEFAULT: '8px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      // 阴影
      boxShadow: {
        'soft': '0 8px 30px rgba(0,0,0,0.04)',
        'card': '0 4px 16px rgba(0,0,0,0.06)',
        'button': '0 4px 14px rgba(255, 107, 107, 0.25)',
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
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      // Z-Index
      zIndex: {
        'base': '1',
        'dropdown': '10',
        'sticky': '40',
        'header': '50',
        'modal': '100',
        'toast': '200',
      },
    },
  },
  plugins: [],
}

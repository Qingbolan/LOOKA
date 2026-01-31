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
        // 主色调：温暖珊瑚色 - 象征梦想、温暖、活力
        primary: {
          DEFAULT: "#FF6B6B", // coral - 主色
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
        // 桃色辅助色 - 温暖、柔和
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
          light: "#FFFAF8", // 淡暖白 - 温暖感
          DEFAULT: "#FFFAF8",
          dark: "#1A1A1A", // 深色模式
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
        // 功能色
        accent: {
          coral: "#FF6B6B",
          peach: "#FFAB91",
          amber: "#F59E0B",
          emerald: "#10B981",
          sky: "#0EA5E9",
        },
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "PingFang SC", "Noto Sans SC", "sans-serif"],
        body: ["Noto Sans SC", "PingFang SC", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0,0,0,0.04)',
        'card': '0 4px 16px rgba(0,0,0,0.06)',
        'button': '0 4px 14px rgba(255, 107, 107, 0.3)',
        'button-peach': '0 4px 14px rgba(255, 171, 145, 0.3)',
        'glow': '0 0 20px rgba(255, 107, 107, 0.4)',
        'glow-peach': '0 0 20px rgba(255, 171, 145, 0.4)',
      },
      backgroundImage: {
        'gradient-dream': 'linear-gradient(135deg, #FF6B6B 0%, #FFAB91 100%)',
        'gradient-dream-soft': 'linear-gradient(135deg, rgba(255,107,107,0.1) 0%, rgba(255,171,145,0.1) 100%)',
        'gradient-dream-dark': 'linear-gradient(135deg, rgba(255,107,107,0.2) 0%, rgba(255,171,145,0.2) 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      // 全局卡片间距
      gap: {
        'card': '6px',
      },
      spacing: {
        'card-gap': '6px',
      },
      // 卡片高度变体
      aspectRatio: {
        'card-1': '3/4',
        'card-2': '4/5',
        'card-3': '3/4.5',
        'card-4': '4/4.5',
      },
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
    },
  },
  plugins: [],
}

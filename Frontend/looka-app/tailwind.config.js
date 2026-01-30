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
        // 主色调：梦幻紫粉渐变 - 象征梦想、魔法、温暖
        primary: {
          DEFAULT: "#A855F7", // purple-500 - 主色
          50: "#FAF5FF",
          100: "#F3E8FF",
          200: "#E9D5FF",
          300: "#D8B4FE",
          400: "#C084FC",
          500: "#A855F7",
          600: "#9333EA",
          700: "#7E22CE",
          800: "#6B21A8",
          900: "#581C87",
        },
        // 粉色辅助色 - 温暖、浪漫
        pink: {
          DEFAULT: "#EC4899",
          50: "#FDF2F8",
          100: "#FCE7F3",
          200: "#FBCFE8",
          300: "#F9A8D4",
          400: "#F472B6",
          500: "#EC4899",
          600: "#DB2777",
        },
        // 背景色
        background: {
          light: "#FFFBFE", // 淡粉白 - 温暖感
          DEFAULT: "#FFFBFE",
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
          violet: "#8B5CF6",
          rose: "#F43F5E",
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
        'button': '0 4px 14px rgba(168, 85, 247, 0.3)',
        'button-pink': '0 4px 14px rgba(236, 72, 153, 0.3)',
        'glow': '0 0 20px rgba(168, 85, 247, 0.4)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.4)',
      },
      backgroundImage: {
        'gradient-dream': 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
        'gradient-dream-soft': 'linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(236,72,153,0.1) 100%)',
        'gradient-dream-dark': 'linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(236,72,153,0.2) 100%)',
      },
      backdropBlur: {
        xs: '2px',
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

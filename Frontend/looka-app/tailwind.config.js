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
        primary: {
          DEFAULT: "#E63946",
          50: "#FEF2F2",
          100: "#FDE8E8",
          200: "#FACDD0",
          300: "#F5A3A9",
          400: "#EE6D78",
          500: "#E63946",
          600: "#D32836",
          700: "#B1202C",
          800: "#921D28",
          900: "#791E26",
        },
        background: {
          light: "#FAFAFA",
          DEFAULT: "#FCFCFC",
        },
        luxury: {
          white: "#FFFFFF",
          black: "#1A1A1A",
        },
        accent: {
          gray: "#F8F9FA",
        },
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "PingFang SC", "Noto Sans SC", "sans-serif"],
        body: ["Noto Sans SC", "PingFang SC", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.75rem",
        lg: "1.5rem",
        xl: "2.25rem",
        "2xl": "1.5rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        'soft': '0 8px 30px rgb(0,0,0,0.02)',
        'card': '0 4px 16px rgba(0,0,0,0.06)',
        'button': '0 4px 14px rgba(230, 57, 70, 0.25)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

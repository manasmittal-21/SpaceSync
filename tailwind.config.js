/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          bg: '#10121A',
          sidebar: '#151824',
          card: '#1B1E2A',
          'card-hover': '#212636',
          'card-subtle': '#141722',
          border: '#2B3040',
          'border-light': '#383F54',
          text: '#F5F5FA',
          muted: '#8E95A9',
          dim: '#5A627A',
        },
        primary: {
          DEFAULT: '#7865F5',
          hover: '#6953EE',
          light: '#8E7EFA',
          subtle: 'rgba(120, 101, 245, 0.12)',
          glow: 'rgba(120, 101, 245, 0.25)',
        },
        secondary: {
          DEFAULT: '#22C7D9',
          hover: '#19B4C5',
          light: '#42D8E8',
          subtle: 'rgba(34, 199, 217, 0.12)',
          glow: 'rgba(34, 199, 217, 0.25)',
        },
        status: {
          available: '#10B981',
          busy: '#EF4444',
          reserved: '#F59E0B',
          maintenance: '#64748B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-primary': '0 0 25px -4px rgba(120, 101, 245, 0.35)',
        'glow-secondary': '0 0 25px -4px rgba(34, 199, 217, 0.35)',
        'card-elevated': '0 12px 36px -8px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(43, 48, 64, 0.8)',
        'subtle-inner': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

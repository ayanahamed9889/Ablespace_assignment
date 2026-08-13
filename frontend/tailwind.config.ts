import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Design tokens - see README "Design system" section.
        ink: {
          DEFAULT: '#12131C',
          soft: '#191B29',
          softer: '#20223A',
          line: '#2A2C40',
        },
        paper: {
          DEFAULT: '#F5F6FA',
          soft: '#FFFFFF',
          line: '#E4E6F1',
        },
        brand: {
          50: '#F0EEFE',
          100: '#E0DCFD',
          200: '#C2B9FB',
          400: '#8A7BF2',
          500: '#5B4FE8',
          600: '#4A3FD1',
          700: '#3B32A8',
        },
        priority: {
          high: '#FF6452',
          medium: '#F5A83D',
          low: '#38BDF8',
        },
        status: {
          todo: '#5B4FE8',
          progress: '#FF8A4C',
          done: '#1FBF8F',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        card: '0.875rem',
        tab: '0.625rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(18,19,28,0.04), 0 8px 24px -12px rgba(18,19,28,0.12)',
        cardHover: '0 4px 12px rgba(18,19,28,0.08), 0 16px 32px -12px rgba(18,19,28,0.18)',
        glow: '0 0 0 1px rgba(91,79,232,0.15), 0 8px 40px -8px rgba(91,79,232,0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.45s cubic-bezier(0.16,1,0.3,1) both',
        'pop-in': 'pop-in 0.2s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
};
export default config;

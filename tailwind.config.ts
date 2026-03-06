import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A3C5E',
          50: '#EEF3F8',
          100: '#D5E3EF',
          200: '#ACC6DE',
          300: '#82A9CD',
          400: '#598CBC',
          500: '#1A3C5E',
          600: '#163451',
          700: '#122B44',
          800: '#0E2236',
          900: '#0A1929',
        },
        accent: '#F59E0B',
        slate: '#F8FAFC',
        dark: '#1E293B',
        muted: '#64748B',
      },
      fontFamily: {
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        slideInLeft: 'slideInLeft 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}
export default config

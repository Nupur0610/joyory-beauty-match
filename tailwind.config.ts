import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        joyory: {
          50: '#FDF8F6',
          100: '#F7EDE8',
          200: '#EED9D2',
          300: '#DFBDB3',
          400: '#CC998D',
          500: '#B87667',
          600: '#A15949',
          700: '#864335',
          800: '#6E3428',
          900: '#5A2B21',
          rose: '#E86178',
          dark: '#1C1917',
          champagne: '#F8F4F0',
          blush: '#FFF5F5',
          gold: '#C59B27',
          accent: '#0D9488',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(184, 118, 103, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 30px -4px rgba(184, 118, 103, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 25px rgba(232, 97, 120, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        caira: {
          teal: 'rgb(92 161 156 / <alpha-value>)',
          navy: 'rgb(60 76 108 / <alpha-value>)',
          ink: 'rgb(30 41 59 / <alpha-value>)',
          mint: 'rgb(184 220 192 / <alpha-value>)',
          cyan: 'rgb(76 203 200 / <alpha-value>)',
          paper: 'rgb(250 251 249 / <alpha-value>)',
          coral: 'rgb(201 109 86 / <alpha-value>)',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out both',
        marquee: 'marquee 35s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        mono: ['Roboto Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        caira: '0.75rem',
      },
      boxShadow: {
        'glow-teal': '0 0 32px rgba(92, 161, 156, 0.25), 0 0 64px rgba(76, 203, 200, 0.1)',
        glass: '0 8px 32px rgba(60, 76, 108, 0.08)',
      },
      maxWidth: {
        site: '80rem',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

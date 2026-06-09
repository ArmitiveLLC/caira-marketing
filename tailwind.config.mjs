/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        caira: {
          teal: 'rgb(92 161 156 / <alpha-value>)',
          navy: 'rgb(60 76 108 / <alpha-value>)',
          mint: 'rgb(184 220 192 / <alpha-value>)',
          cyan: 'rgb(76 203 200 / <alpha-value>)',
          paper: 'rgb(250 251 249 / <alpha-value>)',
          coral: 'rgb(201 109 86 / <alpha-value>)',
        },
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.7s ease-out both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        caira: '0.75rem',
      },
    },
  },
  plugins: [],
};

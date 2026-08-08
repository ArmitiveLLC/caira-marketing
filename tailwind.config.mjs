/** @type {import('tailwindcss').Config} */
/** Sunrise palette v2 — hexes match caira-clients/packages/config/theme/sunrise-palette.js */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        caira: {
          coral: 'rgb(238 108 77 / <alpha-value>)',
          amber: 'rgb(244 163 64 / <alpha-value>)',
          teal: 'rgb(69 179 164 / <alpha-value>)',
          navy: 'rgb(60 76 108 / <alpha-value>)',
          ink: 'rgb(26 34 51 / <alpha-value>)',
          mint: 'rgb(184 220 192 / <alpha-value>)',
          cyan: 'rgb(76 203 200 / <alpha-value>)',
          paper: 'rgb(253 250 246 / <alpha-value>)',
          canvas: 'rgb(243 238 230 / <alpha-value>)',
          mist: 'rgb(232 226 216 / <alpha-value>)',
          success: 'rgb(41 163 106 / <alpha-value>)',
          warning: 'rgb(224 144 11 / <alpha-value>)',
          danger: 'rgb(224 74 63 / <alpha-value>)',
          info: 'rgb(63 169 201 / <alpha-value>)',
          portalSidebar: 'rgb(15 23 42 / <alpha-value>)',
          portalActive: 'rgb(16 185 129 / <alpha-value>)',
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
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
        mono: ['Roboto Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        caira: '1rem',
      },
      boxShadow: {
        'glow-teal': '0 0 32px rgba(69, 179, 164, 0.25), 0 0 64px rgba(76, 203, 200, 0.1)',
        'glow-coral': '0 0 32px rgba(238, 108, 77, 0.25), 0 0 64px rgba(244, 163, 64, 0.1)',
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

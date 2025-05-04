/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        secondary: 'var(--secondary)',
        'secondary-light': 'var(--secondary-light)',
        'background-light': 'var(--background-light)',
        'background-dark': 'var(--background-dark)',
        'border-color': 'var(--border-color)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.secondary'),
            a: {
              color: theme('colors.primary'),
              '&:hover': {
                color: theme('colors.primary-hover'),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.white'),
            a: {
              color: theme('colors.primary'),
              '&:hover': {
                color: theme('colors.primary-hover'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
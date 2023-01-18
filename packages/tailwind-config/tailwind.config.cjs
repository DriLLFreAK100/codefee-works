/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',

      // Codefee Theme
      primary: 'var(--color-primary)',
      'primary-light': 'var(--color-primary-light)',
      'primary-dark': 'var(--color-primary-dark)',
      'primary-on': 'var(--color-primary-on)',
      secondary: 'var(--color-secondary)',
      'secondary-light': 'var(--color-secondary-light)',
      'secondary-dark': 'var(--color-secondary-dark)',
      'secondary-on': 'var(--color-secondary-on)',
      info: 'var(--color-info)',
      'info-light': 'var(--color-info-light)',
      'info-dark': 'var(--color-info-dark)',
      'info-on': 'var(--color-info-on)',
      success: 'var(--color-success)',
      'success-light': 'var(--color-success-light)',
      'success-dark': 'var(--color-success-dark)',
      'success-on': 'var(--color-success-on)',
      warning: 'var(--color-warning)',
      'warning-light': 'var(--color-warning-light)',
      'warning-dark': 'var(--color-warning-dark)',
      'warning-on': 'var(--color-warning-on)',
      error: 'var(--color-error)',
      'error-light': 'var(--color-error-light)',
      'error-dark': 'var(--color-error-dark)',
      'error-on': 'var(--color-error-on)',
      'gray-1': 'var(--color-gray-1)',
      'gray-2': 'var(--color-gray-2)',
      'gray-3': 'var(--color-gray-3)',
      'gray-4': 'var(--color-gray-4)',
      'gray-5': 'var(--color-gray-5)',
      'gray-6': 'var(--color-gray-6)',
      'gray-7': 'var(--color-gray-7)',

      backdrop: 'rgba(109,109,109,0.3)',
      unset: 'unset',
    },
    extend: {
      zIndex: {
        modal: '1000', // Modal
        sidebar: '1100' // Side drawer
      },
      transitionProperty: {
        'visibility-bg-color': 'visibility, background-color',
        'bg-color': 'background-color',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        'hover': 'var(--transition-hover)',
        'toggle': 'var(--transition-toggle)',
      },
    }
  },
  plugins: [],
};

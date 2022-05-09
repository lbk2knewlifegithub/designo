const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
const { join } = require('path');

module.exports = {
  content: [join(__dirname, "src/**/*.{html,ts}")],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '10.281rem',
      },
    },
    fontSize: {
      xs: ['14px', { lineHeight: '14px', letterSpacing: '2px' }],
      sm: ['15px', { lineHeight: '25px' }],
      base: ['16px', { lineHeight: '26px' }],
      md: ['20px', { lineHeight: '26px', letterSpacing: '5px' }],
      lg: ['32px', { lineHeight: '36px' }],
      xl: ['40px', { lineHeight: '48px', letterSpacing: '2px' }],
      '2xl': ['48px', { lineHeight: '48px', }]
    },
    fontFamily: {
      mono: ["'Jost'", ...defaultTheme.fontFamily.mono],
    },
    extend: {
      colors: {
        peach: {
          DEFAULT: 'hsl(11, 100%, 80%)',
          200: 'hsl(11, 73%, 66%)',
        },
        black: {
          DEFAULT: 'hsl(264, 5%, 20%)',
          200: 'hsl(270, 3%, 11%)',
        },
        white: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          200: 'hsl(210, 17%, 95%)',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addComponents }) {
      addComponents({
        '.container': {
          '@screen sm': {
            maxWidth: '100%',
          },
          '@screen 2xl': {
            maxWidth: '1440px',
          },
        },
      });
    }),
  ],
};

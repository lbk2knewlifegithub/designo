const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
const { join } = require('path');

module.exports = {
  content: [join(__dirname, "src/**/*.{html,ts}")],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    fontSize: {
      xs: ['13px', { lineHeight: '19px' }],
      'sm-h': ['14px', { lineHeight: '20px', letterSpacing: '-0.2px' }],
      sm: ['15px', { lineHeight: '22px' }],
      base: ['16px', { lineHeight: '23px' }],
      lg: ['18px', { lineHeight: '26px', letterSpacing: '-0.25px' }],
      xl: ['20px', { lineHeight: '29px', letterSpacing: '-0.25px' }],
      '2xl': ['24px', { lineHeight: '35px', letterSpacing: '-0.33px' }],
    },
    fontFamily: {
      mono: ["'Jost'", ...defaultTheme.fontFamily.mono],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(204, 94%, 68%)',
          200: 'hsl(230, 76%, 59%)',
        },
        warning: {
          DEFAULT: 'hsl(14, 83%, 74%)',
        },
        accent: {
          DEFAULT: 'hsl(282, 83%, 52%)',
        },
        neutral: {
          DEFAULT: 'hsl(224, 20%, 49%)',
          200: 'hsl(231, 33%, 34%)',
          300: 'hsl(230, 31%, 31%)',
        },
        secondary: {
          DEFAULT: 'hsl(230, 60%, 98%)',
          200: 'hsl(231, 100%, 97%)',
        },
        error: {
          DEFAULT: 'hsl(0, 66.7%, 52.9%)',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen 2xl': {
            maxWidth: '1440px',
          },
        },
      });
    }),
  ],
};

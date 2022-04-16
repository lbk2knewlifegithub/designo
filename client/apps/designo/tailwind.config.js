const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
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
          maxWidth: '100%',
          '@screen 2xl': {
            maxWidth: '1440px',
          },
        },
      });
    }),
  ],
};

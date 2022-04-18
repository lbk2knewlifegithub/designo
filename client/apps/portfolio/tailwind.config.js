const plugin = require('tailwindcss/plugin');
const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
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

const defaultTheme = require('tailwindcss/defaultTheme');
const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '.5rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    fontFamily: {
      mono: ["'Heebo'", ...defaultTheme.fontFamily.mono],
      heading: ["'Barlow'", ...defaultTheme.fontFamily.mono],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3e54a3"
        },
        error: {
          DEFAULT: "#ed2c49"
        },
        accent: {
          DEFAULT: "#6abecd"
        },
        success: {
          DEFAULT: "#aad742"
        },
        warning: {
          DEFAULT: "#f1b604",
          '50': "#f48925"
        },
        purple: {
          DEFAULT: "#cf6390"
        },
        secondary: {
          DEFAULT: "#737373"
        },
      }
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

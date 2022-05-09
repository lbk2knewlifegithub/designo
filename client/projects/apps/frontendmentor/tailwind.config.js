const defaultTheme = require('tailwindcss/defaultTheme');
const { join } = require('path');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [join(__dirname, "src/**/*.{html,ts}")],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '.5rem',
        sm: '1rem',
        md: '1rem',
        lg: '2rem',
        xl: '1.5rem',
        '2xl': '0rem',
      },
    },
    fontFamily: {
      mono: ["'Heebo'", ...defaultTheme.fontFamily.mono],
      heading: ["'Barlow'", ...defaultTheme.fontFamily.mono],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3e54a3',
          '50': '#2F4183',
        },
        error: {
          DEFAULT: '#ed2c49',
        },
        accent: {
          DEFAULT: '#6abecd',
        },

        success: {
          DEFAULT: '#aad742',
          '50': "#6FDD9B",
          '100': "#5BA3AE"
        },
        warning: {
          DEFAULT: '#f1b604',
          50: '#f48925',
        },
        purple: {
          DEFAULT: '#cf6390',
        },
        secondary: {
          DEFAULT: '#737373',
          '50': '#F0F4F4',
          '100': '#737373',
          '200': '#D6D6D6',
        },
        dark: {
          DEFAULT: '#24292e',
        },
      },
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen 2xl': {
            maxWidth: '1400px',
          },
        },
      });
    }),
  ],
};

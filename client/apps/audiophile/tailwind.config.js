const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
const { join } = require("path");


module.exports = {
  content: [join(__dirname, "src/**/*.{html,ts}")],
  darkMode: "class",
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
      xs: ["13px", { lineHeight: "25px", letterSpacing: "1px" }],
      sm: ["14px", { lineHeight: "19px", letterSpacing: "10px" }],
      base: ["15px", { lineHeight: "25px" }],
      lg: ["18px", { lineHeight: "24px", letterSpacing: "1.3px" }],
      xl: ["24px", { lineHeight: "33px", letterSpacing: "1.7px" }],
      "2xl": ["28px", { lineHeight: "38px", letterSpacing: "2px" }],
      "3xl": ["32px", { lineHeight: "36px", letterSpacing: "1.15px" }],
      "4xl": ["40px", { lineHeight: "44px", letterSpacing: "1.5px" }],
      "5xl": ["56px", { lineHeight: "58px", letterSpacing: "2px" }],
    },
    extend: {
      fontFamily: {
        mono: ["'Manrope'", ...defaultTheme.fontFamily.mono],
      },
      dropShadow: {
        "3xl": "0px 40px 20px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        "primary-900": 'hsl(22, 65%, 57%)',
        "primary-800": 'hsl(21, 94%, 75%)',
        "muted-900": 'hsl(0, 0%, 95%)',
        "muted-800": 'hsl(0, 0%, 98%)',
        "dark-900": 'hsl(0, 0%, 0%)',
        "dark-800": 'hsl(0, 0%, 5%)',
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
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
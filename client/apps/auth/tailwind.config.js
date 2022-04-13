const defaultTheme = require("tailwindcss/defaultTheme");
const { createGlobPatternsForDependencies } = require("@nrwl/angular/tailwind");
const { join } = require("path");


module.exports = {
  content: [
    join(__dirname, "src/**/*.{html,ts}"),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  daisyui: {
    themes: ["light"],
  },

  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "3rem",
        lg: "0rem",
      },
    },
    extend: {
      colors: {
      },
      fontSize: {
      },
      fontFamily: {
        mono: ["'Nunito'", ...defaultTheme.fontFamily.mono],
      },

      // create custom text colors here
      textColor: {
      },
      // create custom background colors here
      backgroundColor: {
      },
    },
  },
  plugins: [
    require("daisyui"),
  ],
};


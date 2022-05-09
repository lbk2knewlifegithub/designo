const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
const { join } = require("path");

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `hsla(var(${variableName}), ${opacityValue})`;
    }
    return `hsl(var(${variableName}))`;
  };
}

module.exports = {
  content: [join(__dirname, "src/**/*.{html,ts}")],
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
        "primary-900": withOpacity("--primary-900"),
        "primary-800": withOpacity("--primary-800"),

        "danger-900": withOpacity("--danger-900"),
        "danger-800": withOpacity("--danger-800"),

        "success-900": withOpacity("--success-900"),
        "warning-900": withOpacity("--warning-900"),

        "muted-900": withOpacity("--muted-900"),
        "muted-800": withOpacity("--muted-800"),
        "muted-700": withOpacity("--muted-700"),
        "muted-600": withOpacity("--muted-600"),
        "muted-500": withOpacity("--muted-500"),

        "dark-900": withOpacity("--dark-900"),
        elements: withOpacity("--elements"),
      },
      fontSize: {
        sm: ["11px", { lineHeight: "18px", letterSpacing: "-0.23" }],
        base: ["12px", { lineHeight: "15px", letterSpacing: "-0.25px" }],
        lg: ["16px", { lineHeight: "24px", letterSpacing: "-0.8px" }],
        xl: ["20px", { lineHeight: "22px", letterSpacing: "-0.63px" }],
        "2xl": ["24px", { lineHeight: "32px", letterSpacing: "-0.5px" }],
        "3xl": ["32px", { lineHeight: "36px", letterSpacing: "-1px" }],
      },
      fontFamily: {
        mono: ["'Spartan'", ...defaultTheme.fontFamily.mono],
      },
      // create custom text colors here
      textColor: {
        "fill-900": withOpacity("--text-fill-900"),
        "fill-800": withOpacity("--text-fill-800"),
        "inverted-900": withOpacity("--text-inverted-900"),
      },
      // create custom background colors here
      backgroundColor: {
        fill: withOpacity("--bg-fill"),
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    plugin(function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "1440px",
        },
      });
    }),
  ],
};

// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        dark: {
          frame: "hsl(219, 24%, 30%)",
          innerFrame: "hsl(218, 29%, 22%)",
          content: "hsl(216, 30%, 18%)",
          black: "hsl(0, 0%, 0%)",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

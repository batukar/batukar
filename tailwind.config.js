// tailwind.config.js
module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                dark: {
                    frame: "hsl(219, 24%, 30%)",
                    innerFrame: "hsl(218, 29%, 22%)",
                    content: "hsl(216, 30%, 18%)",
                    black: "hsl(0, 0%, 0%)"
                }
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
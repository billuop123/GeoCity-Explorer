/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-primary-color": "#BB86FC",
        "dark-secondary-color": "#03DAC6",
        "dark-background-color": "#121212",
        "dark-text-color": "#FFFFFF",
        "dark-highlight-color": "#333333",

        "normal-primary-color": "#6200EE",
        "normal-secondary-color": "#018786",
        "normal-background-color": "#FFFFFF",
        "normal-text-color": "#212121",
        "normal-highlight-color": "#E0E0E0",
        //   "primary-color": "#0D1B2A",
        //   "secondary-color": "#1B263B",
        //   "accent-color": "#415A77",
        //   "text-color": "#FFFFFF",
        // },
      },
    },
    plugins: [],
  },
};

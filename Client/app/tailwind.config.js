/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/*/*/*",
    "./src/pages/test.jsx"
  ],
  theme: {
    theme: {
      extend: {
        colors: {
          custom: {
            bg: "#fffae5", // Light yellow background
            text: "#2c3e50", // Dark blue text
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}


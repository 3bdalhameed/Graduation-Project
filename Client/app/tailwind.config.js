/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/pages/test.jsx",
    "./src/pages/login.jsx",
    "./src/components/Navbar/navbar.jsx",
    "./src/pages/signup.jsx",
    "./src/pages/challenge.jsx",
    "./src/components/footer/footer.jsx",
    "./src/components/main/main.jsx",
    "./src/components/project/project.jsx",
    "./src/pages/scoreboard.jsx",
    "./src/pages/rules.jsx",
    "./src/pages/setting.jsx",
    "./src/pages/users.jsx",
    "./src/pages/createjointeam.jsx",
    "./src/pages/teamprof.jsx",
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


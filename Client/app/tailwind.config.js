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
    "./src/pages/ticTacToe.jsx",
    "./src/pages/createChallenge.jsx",
    "./src/pages/learning_portal/learningPortalHome.jsx",
    "./src/pages/learning_portal/learningPortalMaterials.jsx",
    "./src/pages/learning_portal/learningPortalLogin.jsx",
    "./src/pages/learning_portal/learningPortalAssesments.jsx",
    "./src/pages/learning_portal/introduction.jsx",
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


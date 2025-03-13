/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/pages/test.jsx",
    "./src/pages/CTF_portal/login.jsx",
    "./src/components/Navbar/navbar.jsx",
    "./src/pages/CTF_portal/signup.jsx",
    "./src/pages/CTF_portal/challenge.jsx",
    "./src/components/footer/footer.jsx",
    "./src/components/main/main.jsx",
    "./src/components/project/project.jsx",
    "./src/pages/CTF_portal/scoreboard.jsx",
    "./src/pages/CTF_portal/rules.jsx",
    "./src/pages/CTF_portal/setting.jsx",
    "./src/pages/CTF_portal/users.jsx",
    "./src/pages/CTF_portal/teams.jsx",
    "./src/pages/CTF_portal/createjointeam.jsx",
    "./src/pages/CTF_portal/teamprof.jsx",
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


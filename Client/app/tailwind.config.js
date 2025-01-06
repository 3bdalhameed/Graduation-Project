/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/test.jsx",
    "./src/pages/login/login.jsx",
    "./src/components/Navbar/navbar.jsx",
    "./src/pages/signup/signup.jsx",
    "./src/pages/challenge/challenge.jsx",
    "./src/components/footer/footer.jsx",
    "./src/components/main/main.jsx",
    "./src/components/project/project.jsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}


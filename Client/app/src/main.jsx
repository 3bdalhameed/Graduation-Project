import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './context/ThemeContext'
import App from './App.jsx'
import './index.css'

// Initialize dark mode from localStorage or system preference
const initializeDarkMode = () => {
  const savedMode = localStorage.getItem("darkMode");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const shouldBeDark = savedMode ? savedMode === "true" : prefersDark;
  
  if (shouldBeDark) {
    document.documentElement.classList.add("dark");
  }
};

initializeDarkMode();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)

import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../../../context/ThemeContext";

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full transition-colors duration-200 
                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
      aria-label="Toggle dark mode"
    >
      <div className="relative w-12 h-6 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-indigo-900 dark:to-blue-900 rounded-full shadow-inner">
        <div
          className={`absolute w-6 h-6 rounded-full shadow-lg 
                    flex items-center justify-center transition-transform duration-300 ease-in-out
                    ${darkMode 
                      ? "bg-indigo-700 translate-x-6" 
                      : "bg-yellow-400 translate-x-0"} top-0`}
        >
          {darkMode ? (
            <FiMoon className="text-white text-xs" />
          ) : (
            <FiSun className="text-yellow-700 text-xs" />
          )}
        </div>
      </div>
    </button>
  );
};

export default DarkModeToggle;

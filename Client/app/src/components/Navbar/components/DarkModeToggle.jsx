import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../../../context/ThemeContext";

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full transition-colors duration-200 
                hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle dark mode"
    >
      <div className="relative w-10 h-6 bg-gray-300 dark:bg-gray-600 rounded-full">
        <div
          className={`absolute w-5 h-5 bg-white dark:bg-gray-800 rounded-full shadow-md 
          transform duration-300 flex items-center justify-center
          ${darkMode ? "translate-x-5" : "translate-x-0.5"} top-0.5`}
        >
          {darkMode ? (
            <FiMoon className="text-blue-400 text-xs" />
          ) : (
            <FiSun className="text-yellow-500 text-xs" />
          )}
        </div>
      </div>
    </button>
  );
};

export default DarkModeToggle;

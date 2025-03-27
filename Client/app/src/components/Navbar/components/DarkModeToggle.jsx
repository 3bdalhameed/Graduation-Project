import React, { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

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
          ${isDarkMode ? "translate-x-5" : "translate-x-0.5"} top-0.5`}
        >
          {isDarkMode ? (
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

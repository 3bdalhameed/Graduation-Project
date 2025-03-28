import React from "react";

const BurgerMenu = ({ isMenuOpen, toggleMenu }) => {
  return (
    <button
      onClick={toggleMenu}
      className="md:hidden flex flex-col justify-center items-center w-10 h-10 
                rounded-lg transition-all duration-300
                hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle menu"
    >
      <span
        className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full transition-all duration-300 
        ${isMenuOpen ? "transform rotate-45 translate-y-1.5" : "mb-1.5"}`}
      ></span>
      <span
        className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full transition-all duration-300 
        ${isMenuOpen ? "opacity-0" : "mb-1.5"}`}
      ></span>
      <span
        className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full transition-all duration-300 
        ${isMenuOpen ? "transform -rotate-45 -translate-y-1.5" : ""}`}
      ></span>
    </button>
  );
};

export default BurgerMenu;

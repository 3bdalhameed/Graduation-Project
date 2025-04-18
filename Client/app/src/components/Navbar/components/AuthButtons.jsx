import React from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaDoorOpen } from "react-icons/fa";

const AuthButtons = ({ isLoggedIn, onLogout, isMobile = false, onMobileClick = null }) => {
  if (isLoggedIn) {
    return (
      <button
        onClick={() => {
          onLogout();
          if (onMobileClick) onMobileClick();
        }}
        className={`
          flex items-center space-x-1 px-5 py-2 text-sm font-medium rounded-lg 
          hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 
          transition-all duration-300 hover:shadow-md
          ${isMobile ? "justify-center w-full py-2.5 px-4 mt-4" : "hidden md:flex"}
        `}
      >
        <FaDoorOpen className="mr-2" />
        <span>Logout</span>
      </button>
    );
  }

  if (isMobile) {
    return (
      <div className="grid grid-cols-1 gap-3 py-4">
        <button
          onClick={() => {
            if (onMobileClick) onMobileClick("/login");
          }}
          className="w-full py-2.5 text-center text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg hover:shadow-md transition-all duration-300"
        >
          <span className="flex items-center justify-center">
            <FaSignInAlt className="mr-2" />
            Login
          </span>
        </button>
        <button
          onClick={() => {
            if (onMobileClick) onMobileClick("/signup");
          }}
          className="w-full py-2.5 text-center text-sm font-medium text-white bg-blue-600 dark:bg-blue-700 rounded-lg hover:shadow-md transition-all duration-300"
        >
          <span className="flex items-center justify-center">
            <FaUserPlus className="mr-2" />
            Sign Up
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-3">
      <Link
        to="/login"
        className="px-5 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:shadow-md"
      >
        <span className="flex items-center">
          <FaSignInAlt className="mr-2" />
          Login
        </span>
      </Link>
      <Link
        to="/signup"
        className="px-5 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-700 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 hover:shadow-md"
      >
        <span className="flex items-center">
          <FaUserPlus className="mr-2" />
          Sign Up
        </span>
      </Link>
    </div>
  );
};

export default AuthButtons;
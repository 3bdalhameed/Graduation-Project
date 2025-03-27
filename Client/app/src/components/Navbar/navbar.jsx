import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFlag, FaUsers, FaBook, FaSchool } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import Logo from "./components/Logo";

const NavBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const navigate = useNavigate();

  // Toggle menu
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  // Toggle dark mode
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

  const handleAuthRedirect = async (path) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  const handleScroll = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 80) {
      setIsVisible(false); // Hide navbar when scrolling down
    } else {
      setIsVisible(true); // Show navbar when scrolling up
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Navigation link items
  const navItems = [
    {
      label: "CTF Portal",
      icon: <FaFlag />,
      href: "/login",
      colorClass: "text-blue-600 dark:text-blue-400",
      hoverClass: "hover:bg-blue-50 dark:hover:bg-blue-900/30"
    },
    {
      label: "Learning Portal",
      icon: <FaBook />,
      href: "/learningPortalLogin",
      colorClass: "text-green-600 dark:text-green-400",
      hoverClass: "hover:bg-green-50 dark:hover:bg-green-900/30"
    },
    {
      label: "School Portal",
      icon: <FaSchool />,
      onClick: () => handleAuthRedirect("/login"),
      colorClass: "text-yellow-600 dark:text-yellow-400",
      hoverClass: "hover:bg-yellow-50 dark:hover:bg-yellow-900/30"
    },
    {
      label: "Login",
      icon: <FaUsers />,
      onClick: () => handleAuthRedirect("/login"),
      colorClass: "text-purple-600 dark:text-purple-400",
      hoverClass: "hover:bg-purple-50 dark:hover:bg-purple-900/30"
    },
  ];

  return (
    <nav
      className={`fixed w-full z-50 shadow-md transition-all duration-300 ease-in-out backdrop-blur-md 
      bg-white/90 dark:bg-gray-900/90 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <div key={index} className="flex items-center">
              {item.href ? (
                <a 
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 
                  font-medium ${item.colorClass} ${item.hoverClass}`}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              ) : (
                <button
                  onClick={item.onClick}
                  className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 
                  font-medium ${item.colorClass} ${item.hoverClass}`}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full transition-colors duration-200 mr-3 
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

          {/* Mobile Menu Button */}
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
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`md:hidden absolute w-full bg-white dark:bg-gray-900 shadow-xl border-t 
                   border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-hidden
                   ${isMenuOpen ? "max-h-96" : "max-h-0"}`}
      >
        <div className="px-6 py-4 space-y-4">
          {navItems.map((item, index) => (
            <div key={index}>
              {item.href ? (
                <a
                  href={item.href}
                  className={`flex items-center py-2 px-3 rounded-md transition-all duration-200 
                  font-medium ${item.colorClass} ${item.hoverClass}`}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              ) : (
                <button
                  onClick={item.onClick}
                  className={`flex w-full text-left items-center py-2 px-3 rounded-md transition-all duration-200 
                  font-medium ${item.colorClass} ${item.hoverClass}`}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

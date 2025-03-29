import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFlag, FaUsers, FaBook, FaSchool } from "react-icons/fa";

// Import components
import Logo from "./components/Logo";
import BurgerMenu from "./components/BurgerMenu";
import NavigationLinks from "./components/NavigationLinks";
import DarkModeToggle from "./components/DarkModeToggle";

const NavBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  // Toggle menu
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
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
        <NavigationLinks 
          navItems={navItems} 
          isMobile={false} 
        />

        <div className="flex items-center">
          {/* Dark Mode Toggle */}
          <DarkModeToggle />

          {/* Mobile Menu Button */}
          <BurgerMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`md:hidden absolute w-full bg-white dark:bg-gray-900 shadow-xl border-t 
                   border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-hidden
                   ${isMenuOpen ? "max-h-96" : "max-h-0"}`}
      >
        <div className="px-6 py-4 space-y-4">
          <NavigationLinks 
            navItems={navItems} 
            isMobile={true} 
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
